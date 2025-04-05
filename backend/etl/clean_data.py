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
    # Eliminar columnas no esperadas
    df.columns = [col.strip().lower() for col in df.columns]
    df = df[[col for col in df.columns if col in EXPECTED_COLUMNS]]

    # Verificar columnas requeridas
    missing_required = [col for col in REQUIRED_FIELDS if col not in df.columns]
    if missing_required:
        raise ValueError(f"Faltan columnas requeridas: {missing_required}")

    # Asegurar que customer id sea numérico
    df["customer id"] = pd.to_numeric(df["customer id"], errors="coerce").astype(
        "Int64"
    )

    # Convertir purchase amount a numérico
    df["purchase amount (usd)"] = pd.to_numeric(
        df["purchase amount (usd)"], errors="coerce"
    )

    # Eliminar las filas que no tienen todos los campos requeridos.
    df.dropna(subset=REQUIRED_FIELDS, inplace=True)

    # Eliminar registros duplicados por customer ID
    df.drop_duplicates(subset="customer id", keep="first", inplace=True)
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

    # Conversión de edad
    df["age"] = pd.to_numeric(df.get("age"), errors="coerce")
    median_age = df["age"].median()
    df["age"] = df["age"].fillna(median_age).astype(int)

    # Calcular grupo etario
    df["age group"] = df["age"].apply(get_age_group)

    # Asignar defaults
    df["gender"] = df["gender"].fillna(Gender.UNKNOWN)
    df["previous purchases"] = (
        pd.to_numeric(df["previous purchases"], errors="coerce").fillna(0).astype(int)
    )
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

    # Conversión de booleanos desde "yes"/"no"
    bool_map = {"yes": True, "no": False}
    df["subscription status"] = df["subscription status"].map(bool_map).fillna(False)
    df["discount applied"] = df["discount applied"].map(bool_map).fillna(False)
    df["promo code used"] = df["promo code used"].map(bool_map).fillna(False)

    # Rellenar 'review rating' con la mediana
    df["review rating"] = pd.to_numeric(df["review rating"], errors="coerce")
    df["review rating"] = df["review rating"].fillna(df["review rating"].median())

    # Rellenar 'location' con la moda o 'unknown'
    if "location" in df.columns:
        location_mode = df["location"].mode()
        df["location"] = df["location"].fillna(
            location_mode[0] if not location_mode.empty else "unknown"
        )
        df["location"] = df["location"].str.title()

    # Rellenar 'shipping type' con la moda o 'standard'
    if "shipping type" in df.columns:
        shipping_mode = df["shipping type"].mode()
        df["shipping type"] = df["shipping type"].fillna(
            shipping_mode[0] if not shipping_mode.empty else ShippingType.STANDARD
        )

    # Asegurar que cada producto tenga siempre la misma categoría
    category_map = (
        df.groupby("item purchased")["category"]
        .agg(lambda x: x.mode().iloc[0] if not x.mode().empty else Category.OTHER)
        .to_dict()
    )
    df["category"] = df["item purchased"].map(category_map)

    return df
