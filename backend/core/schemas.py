from drf_spectacular.utils import OpenApiParameter, inline_serializer
from rest_framework import serializers

from .models.choices import Category, Gender, PurchaseFrequency

customer_insights_schema = {
    "summary": "Insights de los clientes",
    "description": (
        "Devuelve información agregada de los clientes y tendencias de compra."
    ),
    "tags": ["Clientes"],
    "parameters": [
        OpenApiParameter(
            name="gender",
            type=str,
            enum=[choice.value for choice in Gender],
            description="Filtrar por género del cliente",
        ),
        OpenApiParameter(
            name="age_gte",
            type=int,
            description="Filtrar por edad mínima",
        ),
        OpenApiParameter(
            name="age_lte",
            type=int,
            description="Filtrar por edad máxima",
        ),
        # Purchase Behavior Filters
        OpenApiParameter(
            name="subscribed",
            type=bool,
            description="Filtrar por estado de suscripción",
        ),
        OpenApiParameter(
            name="frequency",
            type=str,
            enum=[choice.value for choice in PurchaseFrequency],
            description="Filtrar por frecuencia de compra",
            many=True,
            allow_blank=True,
        ),
        OpenApiParameter(
            name="category",
            type=str,
            enum=[choice.value for choice in Category],
            description="Filtrar por categoría de producto",
            many=True,
        ),
    ],
    "responses": {
        200: inline_serializer(
            name="CustomerInsightsResponse",
            fields={
                "total_customers": serializers.IntegerField(),
                "total_orders": serializers.IntegerField(),
                "total_sales": serializers.FloatField(),
                "average_age": serializers.FloatField(),
                "subscription_rate": serializers.FloatField(),
                "average_previous_purchases": serializers.FloatField(),
                "average_order_value": serializers.FloatField(),
                "average_review_rating": serializers.FloatField(),
                "customer_distribution_by_gender": serializers.ListSerializer(
                    child=inline_serializer(
                        name="GenderDistribution",
                        fields={
                            "gender": serializers.CharField(),
                            "count": serializers.IntegerField(),
                        },
                    )
                ),
                "customer_distribution_by_age": serializers.ListSerializer(
                    child=inline_serializer(
                        name="AgeDistribution",
                        fields={
                            "age": serializers.IntegerField(),
                            "male": serializers.IntegerField(),
                            "female": serializers.IntegerField(),
                        },
                    )
                ),
                "customer_distribution_by_subscription": serializers.ListSerializer(
                    child=inline_serializer(
                        name="SubscriptionDistribution",
                        fields={
                            "subscription_status": serializers.BooleanField(),
                            "male": serializers.IntegerField(),
                            "female": serializers.IntegerField(),
                        },
                    )
                ),
                "customer_distribution_by_frequency": serializers.ListSerializer(
                    child=inline_serializer(
                        name="FrequencyDistribution",
                        fields={
                            "frequency_of_purchases": serializers.CharField(),
                            "male": serializers.IntegerField(),
                            "female": serializers.IntegerField(),
                        },
                    )
                ),
                "total_orders_by_category_gender": serializers.ListSerializer(
                    child=inline_serializer(
                        name="CategoryDistribution",
                        fields={
                            "category": serializers.CharField(),
                            "male": serializers.IntegerField(),
                            "female": serializers.IntegerField(),
                        },
                    )
                ),
                "total_sales_by_category_gender": serializers.ListSerializer(
                    child=inline_serializer(
                        name="CategorySalesDistribution",
                        fields={
                            "category": serializers.CharField(),
                            "male": serializers.FloatField(),
                            "female": serializers.FloatField(),
                        },
                    )
                ),
                "avg_order_value_by_category_gender": serializers.ListSerializer(
                    child=inline_serializer(
                        name="CategoryAvgDistribution",
                        fields={
                            "category": serializers.CharField(),
                            "male": serializers.FloatField(),
                            "female": serializers.FloatField(),
                        },
                    )
                ),
            },
        ),
    },
}
