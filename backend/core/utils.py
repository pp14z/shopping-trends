from collections import defaultdict

from .models import AgeGroup


def get_age_group(age: int) -> AgeGroup:
    if age < 18:
        return AgeGroup.UNDER_18
    elif 18 <= age <= 25:
        return AgeGroup.B18_25
    elif 26 <= age <= 35:
        return AgeGroup.B26_35
    elif 36 <= age <= 50:
        return AgeGroup.B36_50
    else:
        return AgeGroup.OVER_51


def pivot_grouped_by_gender(
    queryset,
    field: str,
    gender_field: str = "gender",
    rename_field: str = None,
    decimal_places=None,
) -> list[dict]:
    """
    Convierte un queryset con agrupaciones por género en
    un formato pivot listo para gráficos.

    Params:
        queryset: resultado de .values(field, gender_field).annotate(count=...).
        field: campo agrupado (ej. 'category', 'age', etc.).
        gender_field: campo que representa el género.
        rename_field: si se desea cambiar el nombre del campo agrupado en la salida.
        decimal_places: redondear los valores numéricos a N decimales.
    """

    grouped = defaultdict(lambda: {rename_field or field: None, "male": 0, "female": 0})

    for row in queryset:
        key = row[field]
        gender = row[gender_field]
        count = row["count"]

        if decimal_places is not None:
            count = round(count, decimal_places)

        grouped[key][rename_field or field] = key
        grouped[key][gender] = count

    return sorted(grouped.values(), key=lambda x: x[rename_field or field])
