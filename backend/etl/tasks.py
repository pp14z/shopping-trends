import pandas as pd

from .clean_data import clean_data


def run_etl(csv_path):
    # Cargar CSV en un DataFrame
    try:
        df_raw = pd.read_csv(csv_path)
    except FileNotFoundError:
        print(f"Archivo no encontrado: {csv_path}")
        return

    print("CSV cargado correctamente.")

    # Limpiar los datos
    df_cleaned = clean_data(df_raw)
    print("Datos limpios:")

    # Mostrar primeros registros
    print(df_cleaned.head())

    # Mostrar resumen general (opcional)
    print("\nResumen del DataFrame limpio:")
    print(df_cleaned.info())
