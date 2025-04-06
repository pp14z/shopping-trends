from pathlib import Path

import pandas as pd
from django.test import TestCase

from core.models import Customer, Order, Product, ProductVariant
from etl.clean_data import clean_data
from etl.load_data import load_data


class LoadDataTestCase(TestCase):
    def setUp(self):
        path = Path(__file__).parent / "data" / "sample_complete.csv"
        df_raw = pd.read_csv(path)
        self.df_clean = clean_data(df_raw)

    def test_load_data_creates_models_correctly(self):
        load_data(self.df_clean)

        self.assertEqual(Customer.objects.count(), self.df_clean.shape[0])
        self.assertEqual(Order.objects.count(), self.df_clean.shape[0])
        self.assertGreater(Product.objects.count(), 0)
        self.assertGreater(ProductVariant.objects.count(), 0)

        # Verifica relaciones
        order = Order.objects.select_related("customer", "product_variant").first()
        self.assertIsNotNone(order.customer)
        self.assertIsNotNone(order.product_variant)
        self.assertIsNotNone(order.product_variant.product)

    def test_loading_twice_does_not_duplicate_customers_variants_products(self):
        load_data(self.df_clean)
        load_data(self.df_clean)

        # Estas entidades deben mantenerse sin duplicados
        self.assertEqual(Customer.objects.count(), self.df_clean.shape[0])
        self.assertLessEqual(
            Product.objects.count(), self.df_clean["item purchased"].nunique()
        )
        self.assertLessEqual(ProductVariant.objects.count(), self.df_clean.shape[0])

        # Las órdenes sí se duplican (por diseño)
        self.assertEqual(Order.objects.count(), self.df_clean.shape[0] * 2)
