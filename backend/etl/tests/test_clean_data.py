from pathlib import Path

import numpy as np
import pandas as pd
from django.test import TestCase

from core.models.choices import Gender
from etl.clean_data import clean_data


class CleanDataTestCase(TestCase):
    def setUp(self):
        def file_path(file_name: str) -> Path:
            return Path(__file__).parent / "data" / file_name

        self.correct_csv_path = file_path("sample_complete.csv")
        self.empty_csv_path = file_path("sample_empty.csv")
        self.missing_column_csv_path = file_path("sample_missing_column.csv")
        self.duplicated_row_csv_path = file_path("sample_duplicated_row.csv")
        self.missing_optional_row_data_csv_path = file_path(
            "sample_missing_optional_row_data.csv"
        )
        self.missing_required_row_data_csv_path = file_path(
            "sample_missing_required_row_data.csv"
        )

        # self.incomplete_csv_path = file_path("shopping_trends_incomplete.csv")
        # self.invalid_csv_path = file_path("shopping_trends_invalid.csv")

    def test_clean_data_with_complete_file(self):
        df = pd.read_csv(self.correct_csv_path)
        original_total = df.shape[0]

        df_clean = clean_data(df)
        cleaned_total = df_clean.shape[0]

        self.assertFalse(df_clean.empty)
        self.assertEqual(original_total, cleaned_total)
        self.assertFalse(df_clean["customer id"].duplicated().any())

        # Tipos esperados
        self.assertIsInstance(df_clean["age"].iloc[0], (int, np.integer))
        self.assertIsInstance(
            df_clean["purchase amount (usd)"].iloc[0],
            (float, np.floating, int, np.integer),
        )
        self.assertIsInstance(df_clean["subscription status"].iloc[0], (bool, np.bool_))
        self.assertIsInstance(df_clean["discount applied"].iloc[0], (bool, np.bool_))
        self.assertIsInstance(df_clean["previous purchases"].iloc[0], (int, np.integer))

    def test_clean_data_with_empty_file(self):
        df = pd.read_csv(self.empty_csv_path)

        with self.assertRaises(ValueError) as ctx:
            clean_data(df)

        self.assertIn("vacío", str(ctx.exception).lower())

    def test_clean_data_with_missing_column_file(self):
        df = pd.read_csv(self.missing_column_csv_path)

        with self.assertRaises(ValueError) as ctx:
            clean_data(df)

        self.assertIn("faltan columnas", str(ctx.exception).lower())

    def test_clean_data_with_duplicated_row_file(self):
        df = pd.read_csv(self.duplicated_row_csv_path)
        original_total = df.shape[0]

        df_clean = clean_data(df)
        cleaned_total = df_clean.shape[0]

        self.assertEqual(original_total - 1, cleaned_total)

    def test_clean_data_with_missing_optional_row_data_file(self):
        df = pd.read_csv(self.missing_optional_row_data_csv_path)
        original_total = df.shape[0]

        df_clean = clean_data(df)
        cleaned_total = df_clean.shape[0]

        self.assertEqual(original_total, cleaned_total)
        self.assertEqual(df_clean["gender"].iloc[0], Gender.UNKNOWN)
        self.assertEqual(df_clean["subscription status"].iloc[0], False)

    def test_clean_data_with_missing_required_row_data_file(self):
        df = pd.read_csv(self.missing_required_row_data_csv_path)
        original_total = df.shape[0]

        df_clean = clean_data(df)
        cleaned_total = df_clean.shape[0]

        self.assertEqual(original_total - 1, cleaned_total)
