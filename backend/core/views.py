from django.db.models import Avg, Sum
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import mixins, viewsets
from rest_framework.response import Response

from .filters import CustomerInsightsFilter
from .models import Customer, Order


class CustomerInsightsViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    authentication_classes = []
    permission_classes = []
    filter_backends = [DjangoFilterBackend]
    filterset_class = CustomerInsightsFilter

    def get_queryset(self):
        return Order.objects.select_related("customer", "product_variant__product")

    def list(self, request, *args, **kwargs):
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

        # === Métricas de órdenes ===
        total_orders = orders.count()
        total_sales = orders.aggregate(total=Sum("purchase_amount"))["total"] or 0
        avg_order_value = total_sales / total_orders if total_orders else 0
        avg_review_rating = orders.aggregate(avg=Avg("review_rating"))["avg"] or 0

        return Response(
            {
                "total_customers": total_customers,
                "total_orders": total_orders,
                "total_sales": round(total_sales, 2),
                "average_age": round(avg_age, 1),
                "subscription_rate": round(subscription_rate, 1),
                "average_previous_purchases": round(avg_orders, 1),
                "average_order_value": round(avg_order_value, 2),
                "average_review_rating": round(avg_review_rating, 2),
            }
        )
