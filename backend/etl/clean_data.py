import pandas as pd

from core.models.choices import (
    Category,
    Gender,
    PaymentMethod,
    PurchaseFrequency,
    Season,
    ShippingType,
    Size,
)
from core.utils import get_age_group

pd.set_option("future.no_silent_downcasting", True)

EXPECTED_COLUMNS = {
    "customer id",
    "age",
    "gender",
    "subscription status",
    "previous purchases",
    "frequency of purchases",
    "preferred payment method",
    "item purchased",
    "category",
    "season",
    "size",
    "color",
    "purchase amount (usd)",
    "location",
    "review rating",
    "payment method",
    "shipping type",
    "discount applied",
    "promo code used",
}

REQUIRED_FIELDS = [
    "customer id",
    "item purchased",
    "purchase amount (usd)",
]


def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    if df.empty:
        raise ValueError("El archivo CSV está vacío o no contiene datos válidos.")

    # Verificar que todas las columnas esperadas estén presentes
    df.columns = [col.strip().lower() for col in df.columns]
    missing_columns = [col for col in EXPECTED_COLUMNS if col not in df.columns]
    if missing_columns:
        raise ValueError(f"Faltan columnas esperadas: {missing_columns}")

    # Eliminar columnas no esperadas
    df = df[[col for col in df.columns if col in EXPECTED_COLUMNS]]

    # Asegurar que customer id y monto sean numéricos
    df["customer id"] = pd.to_numeric(df["customer id"], errors="coerce").astype(
        "Int64"
    )
    df["purchase amount (usd)"] = pd.to_numeric(
        df["purchase amount (usd)"], errors="coerce"
    )

    # Eliminar filas incompletas y duplicadas
    df.dropna(subset=REQUIRED_FIELDS, inplace=True)
    df.drop_duplicates(subset="customer id", keep="first", inplace=True)

    # Convertir ID del client a int
    df["customer id"] = df["customer id"].astype(int)

    # Normalización de texto
    text_columns = [
        "gender",
        "subscription status",
        "frequency of purchases",
        "preferred payment method",
        "item purchased",
        "category",
        "season",
        "size",
        "color",
        "location",
        "payment method",
        "shipping type",
        "discount applied",
        "promo code used",
    ]
    for col in text_columns:
        if col in df.columns:
            df[col] = df[col].where(
                df[col].isna(), df[col].astype(str).str.strip().str.lower()
            )

    # Edad: convertir, rellenar con mediana (o fallback), y convertir a int
    df["age"] = pd.to_numeric(df.get("age"), errors="coerce")
    median_age = df["age"].median()
    fallback_age = 30
    df["age"] = (
        df["age"]
        .fillna(median_age if pd.notna(median_age) else fallback_age)
        .astype(int)
    )

    # Calcular grupo etario
    df["age group"] = df["age"].apply(get_age_group)

    # Asignar defaults
    df["gender"] = df["gender"].fillna(Gender.UNKNOWN)
    df["previous purchases"] = pd.to_numeric(df["previous purchases"], errors="coerce")
    df["previous purchases"] = df["previous purchases"].fillna(0).astype(int)
    df["frequency of purchases"] = df["frequency of purchases"].fillna(
        PurchaseFrequency.UNKNOWN
    )
    df["preferred payment method"] = df["preferred payment method"].fillna(
        PaymentMethod.UNKNOWN
    )
    df["category"] = df["category"].fillna(Category.OTHER)
    df["season"] = df["season"].fillna(Season.UNKNOWN)
    df["size"] = df["size"].fillna(Size.OTHER)
    df["color"] = df["color"].fillna("unknown")
    df["payment method"] = df["payment method"].fillna(PaymentMethod.UNKNOWN)

    # Booleanos desde texto
    bool_map = {"yes": True, "no": False}
    df["subscription status"] = df["subscription status"].map(bool_map).fillna(False)
    df["discount applied"] = df["discount applied"].map(bool_map).fillna(False)
    df["promo code used"] = df["promo code used"].map(bool_map).fillna(False)

    # Review rating con fallback
    df["review rating"] = pd.to_numeric(df["review rating"], errors="coerce")
    median_rating = df["review rating"].median()
    df["review rating"] = df["review rating"].fillna(
        median_rating if pd.notna(median_rating) else 3.0
    )

    # Location con moda o fallback
    if "location" in df.columns:
        location_mode = df["location"].mode()
        df["location"] = df["location"].fillna(
            location_mode[0] if not location_mode.empty else "unknown"
        )
        df["location"] = df["location"].str.title()

    # Shipping type con moda o fallback
    if "shipping type" in df.columns:
        shipping_mode = df["shipping type"].mode()
        df["shipping type"] = df["shipping type"].fillna(
            shipping_mode[0] if not shipping_mode.empty else ShippingType.STANDARD
        )

    # Categoría consistente por producto
    category_map = (
        df.groupby("item purchased")["category"]
        .agg(lambda x: x.mode().iloc[0] if not x.mode().empty else Category.OTHER)
        .to_dict()
    )
    df["category"] = df["item purchased"].map(category_map).fillna(Category.OTHER)

    return df
