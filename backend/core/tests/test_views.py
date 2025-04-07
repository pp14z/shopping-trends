from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from core.models import Customer, Order, Product, ProductVariant
from core.models.choices import Category, Gender, PurchaseFrequency


class CustomerInsightsViewSetTest(APITestCase):
    def setUp(self):
        # Crear clientes
        self.customer_male = Customer.objects.create(
            id=1,
            age=25,
            gender=Gender.MALE,
            subscription_status=True,
            previous_purchases=5,
            frequency_of_purchases=PurchaseFrequency.WEEKLY,
        )
        self.customer_female = Customer.objects.create(
            id=2,
            age=30,
            gender=Gender.FEMALE,
            subscription_status=False,
            previous_purchases=3,
            frequency_of_purchases=PurchaseFrequency.MONTHLY,
        )

        # Crear productos
        self.product = Product.objects.create(
            name="Test Product",
            category=Category.CLOTHING,
        )
        self.variant = ProductVariant.objects.create(
            product=self.product,
            size="M",
            color="Blue",
        )

        # Crear ordenes
        Order.objects.create(
            customer=self.customer_male,
            product_variant=self.variant,
            purchase_amount=100.00,
            review_rating=4.5,
        )
        Order.objects.create(
            customer=self.customer_female,
            product_variant=self.variant,
            purchase_amount=150.00,
            review_rating=4.0,
        )

        self.url = reverse("customer_insights-list")

    def test_insights_endpoint_returns_200(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_insights_contains_all_required_fields(self):
        response = self.client.get(self.url)
        required_fields = {
            "total_customers",
            "total_orders",
            "total_sales",
            "average_age",
            "subscription_rate",
            "average_previous_purchases",
            "average_order_value",
            "average_review_rating",
            "customer_distribution_by_gender",
            "customer_distribution_by_age",
            "customer_distribution_by_subscription",
            "customer_distribution_by_frequency",
            "total_orders_by_category_gender",
            "total_sales_by_category_gender",
            "avg_order_value_by_category_gender",
        }
        self.assertEqual(set(response.data.keys()), required_fields)

    def test_insights_calculations_are_correct(self):
        response = self.client.get(self.url)
        data = response.data

        # Probar metricas basicas
        self.assertEqual(data["total_customers"], 2)
        self.assertEqual(data["total_orders"], 2)
        self.assertEqual(data["total_sales"], 250.00)
        self.assertEqual(data["average_age"], 27.5)
        self.assertEqual(data["subscription_rate"], 50.0)
        self.assertEqual(data["average_previous_purchases"], 4.0)
        self.assertEqual(data["average_order_value"], 125.00)
        self.assertEqual(data["average_review_rating"], 4.25)

    def test_filter_by_gender(self):
        response = self.client.get(self.url, {"gender": Gender.MALE})
        data = response.data

        self.assertEqual(data["total_customers"], 1)
        self.assertEqual(data["total_orders"], 1)
        self.assertEqual(data["average_age"], 25.0)

    def test_filter_by_age_range(self):
        response = self.client.get(self.url, {"age_gte": 20, "age_lte": 28})
        data = response.data

        self.assertEqual(data["total_customers"], 1)
        self.assertEqual(data["average_age"], 25.0)

    def test_filter_by_subscription_status(self):
        response = self.client.get(self.url, {"subscribed": True})
        data = response.data

        self.assertEqual(data["total_customers"], 1)
        self.assertEqual(data["subscription_rate"], 100.0)

    def test_filter_by_category(self):
        response = self.client.get(self.url, {"category": [Category.CLOTHING]})
        data = response.data

        self.assertEqual(data["total_customers"], 2)
        self.assertEqual(data["total_orders"], 2)
        self.assertEqual(data["total_sales"], 250.00)

        # Probar con categoria no existente
        response = self.client.get(self.url, {"category": [Category.FOOTWEAR]})
        data = response.data

        self.assertEqual(data["total_customers"], 0)
        self.assertEqual(data["total_orders"], 0)
        self.assertEqual(data["total_sales"], 0)

    def test_filter_by_purchase_frequency(self):
        response = self.client.get(self.url, {"frequency": [PurchaseFrequency.WEEKLY]})
        data = response.data

        self.assertEqual(data["total_customers"], 1)
        self.assertEqual(data["total_orders"], 1)
        self.assertEqual(
            data["average_previous_purchases"], 5.0
        )

    def test_distribution_data_structure(self):
        response = self.client.get(self.url)
        data = response.data

        # Probar estructura de distribución por genero
        gender_dist = data["customer_distribution_by_gender"]
        self.assertTrue(isinstance(gender_dist, list))
        self.assertEqual(len(gender_dist), 2)  # Male and Female
        self.assertTrue(
            all(
                isinstance(item, dict) and "gender" in item and "count" in item
                for item in gender_dist
            )
        )

        # Probar estructura de distribución por categoría
        category_dist = data["total_orders_by_category_gender"]
        self.assertTrue(isinstance(category_dist, list))
        self.assertTrue(
            all(
                isinstance(item, dict)
                and "category" in item
                and "male" in item
                and "female" in item
                for item in category_dist
            )
        )
