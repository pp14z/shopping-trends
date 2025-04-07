import django_filters

from core.models import Order
from core.models.choices import Category, PurchaseFrequency


class CustomerInsightsFilter(django_filters.FilterSet):
    age_gte = django_filters.NumberFilter(field_name="customer__age", lookup_expr="gte")
    age_lte = django_filters.NumberFilter(field_name="customer__age", lookup_expr="lte")
    gender = django_filters.CharFilter(
        field_name="customer__gender", lookup_expr="iexact"
    )
    subscribed = django_filters.BooleanFilter(
        field_name="customer__subscription_status"
    )
    # Replace AllValuesMultipleFilter with MultipleChoiceFilter for frequency
    frequency = django_filters.MultipleChoiceFilter(
        field_name="customer__frequency_of_purchases",
        choices=PurchaseFrequency.choices,
        conjoined=False,
    )
    # Replace AllValuesMultipleFilter with MultipleChoiceFilter
    category = django_filters.MultipleChoiceFilter(
        field_name="product_variant__product__category",
        choices=Category.choices,
        conjoined=False,
    )

    class Meta:
        model = Order
        fields = []
