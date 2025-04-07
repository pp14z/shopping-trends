import django_filters

from core.models import Order


class CustomerInsightsFilter(django_filters.FilterSet):
    age_gte = django_filters.NumberFilter(field_name="customer__age", lookup_expr="gte")
    age_lte = django_filters.NumberFilter(field_name="customer__age", lookup_expr="lte")
    gender = django_filters.CharFilter(
        field_name="customer__gender", lookup_expr="iexact"
    )
    subscribed = django_filters.BooleanFilter(
        field_name="customer__subscription_status"
    )
    frequency = django_filters.AllValuesMultipleFilter(
        field_name="customer__frequency_of_purchases",
        conjoined=False,
    )
    category = django_filters.AllValuesMultipleFilter(
        field_name="product_variant__product__category",
        conjoined=False,
    )

    class Meta:
        model = Order
        fields = []
