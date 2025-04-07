from django.conf import settings
from django.core.cache import cache
from django.db.models import Avg, Count, Sum
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema
from rest_framework import mixins, viewsets
from rest_framework.response import Response

from .filters import CustomerInsightsFilter
from .models import Customer, Order
from .schemas import customer_insights_schema
from .utils import pivot_grouped_by_gender


class CustomerInsightsViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    authentication_classes = []
    permission_classes = []
    filter_backends = [DjangoFilterBackend]
    filterset_class = CustomerInsightsFilter

    def get_cache_key(self, request):
        """Generate a unique cache key based on the request parameters"""
        query_params = request.query_params.copy()
        sorted_params = sorted(query_params.items())
        params_string = "_".join(f"{k}:{v}" for k, v in sorted_params)
        return f"customer_insights_{params_string}"

    def get_queryset(self):
        return Order.objects.select_related("customer", "product_variant__product")

    @extend_schema(**customer_insights_schema)
    def list(self, request, *args, **kwargs):
        cache_key = self.get_cache_key(request)
        cached_data = cache.get(cache_key)

        if cached_data is not None:
            return Response(cached_data)

        orders = self.filter_queryset(self.get_queryset())
        customers = Customer.objects.filter(
            id__in=orders.values_list("customer_id", flat=True).distinct()
        )

        # === Métricas de clientes ===
        total_customers = customers.count()
        avg_age = customers.aggregate(avg=Avg("age"))["avg"] or 0
        total_subscribed = customers.filter(subscription_status=True).count()
        subscription_rate = (
            (total_subscribed / total_customers * 100) if total_customers else 0
        )
        avg_orders = customers.aggregate(avg=Avg("previous_purchases"))["avg"] or 0

        # === Anotaciones de clientes ===
        customer_distribution_by_gender = list(
            customers.values("gender").annotate(count=Count("id")).order_by("gender")
        )

        raw_age = customers.values("age", "gender").annotate(count=Count("id"))
        customer_distribution_by_age = pivot_grouped_by_gender(raw_age, "age")

        raw_subscription = customers.values("subscription_status", "gender").annotate(
            count=Count("id")
        )
        customer_distribution_by_subscription = pivot_grouped_by_gender(
            raw_subscription, "subscription_status"
        )

        raw_freq = customers.values("frequency_of_purchases", "gender").annotate(
            count=Count("id")
        )
        customer_distribution_by_frequency = pivot_grouped_by_gender(
            raw_freq, "frequency_of_purchases"
        )

        # === Métricas de órdenes ===
        total_orders = orders.count()
        total_sales = orders.aggregate(total=Sum("purchase_amount"))["total"] or 0
        avg_order_value = total_sales / total_orders if total_orders else 0
        avg_review_rating = orders.aggregate(avg=Avg("review_rating"))["avg"] or 0

        # === Anotaciones de órdenes ===
        raw_orders_by_category_gender = orders.values(
            "product_variant__product__category", "customer__gender"
        ).annotate(count=Count("id"))
        total_orders_by_category_gender = pivot_grouped_by_gender(
            raw_orders_by_category_gender,
            field="product_variant__product__category",
            gender_field="customer__gender",
            rename_field="category",
        )

        raw_sales_by_category_gender = orders.values(
            "product_variant__product__category", "customer__gender"
        ).annotate(count=Sum("purchase_amount"))
        total_sales_by_category_gender = pivot_grouped_by_gender(
            raw_sales_by_category_gender,
            field="product_variant__product__category",
            gender_field="customer__gender",
            rename_field="category",
            decimal_places=1,
        )

        raw_avg_order_value_by_category_gender = orders.values(
            "product_variant__product__category", "customer__gender"
        ).annotate(count=Avg("purchase_amount"))
        avg_order_value_by_category_gender = pivot_grouped_by_gender(
            raw_avg_order_value_by_category_gender,
            field="product_variant__product__category",
            gender_field="customer__gender",
            rename_field="category",
            decimal_places=2,
        )

        response_data = {
            "total_customers": total_customers,
            "total_orders": total_orders,
            "total_sales": round(total_sales, 2),
            "average_age": round(avg_age, 1),
            "subscription_rate": round(subscription_rate, 1),
            "average_previous_purchases": round(avg_orders, 1),
            "average_order_value": round(avg_order_value, 2),
            "average_review_rating": round(avg_review_rating, 2),
            "customer_distribution_by_gender": customer_distribution_by_gender,
            "customer_distribution_by_age": customer_distribution_by_age,
            "customer_distribution_by_subscription": (
                customer_distribution_by_subscription
            ),
            "customer_distribution_by_frequency": (customer_distribution_by_frequency),
            "total_orders_by_category_gender": total_orders_by_category_gender,
            "total_sales_by_category_gender": total_sales_by_category_gender,
            "avg_order_value_by_category_gender": (avg_order_value_by_category_gender),
        }

        # Guardar response en la cache
        cache.set(cache_key, response_data, timeout=settings.CACHE_TTL)

        return Response(response_data)
