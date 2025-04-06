import logging

import pandas as pd

from .clean_data import clean_data
from .load_data import load_data

logger = logging.getLogger(__name__)


def run_etl(csv_path):
    try:
        print(f"Leyendo archivo: {csv_path}")
        df_raw = pd.read_csv(csv_path)
        print("CSV cargado correctamente.")
    except FileNotFoundError:
        logger.error(f"Archivo no encontrado: {csv_path}")
        return
    except pd.errors.ParserError as e:
        logger.error(f"Error al leer el CSV: {e}")
        return

    try:
        print("Limpiando y normalizando datos...")
        df_clean = clean_data(df_raw)
    except Exception as e:  # noqa: F841
        logger.exception("Error durante la limpieza de datos")
        return

    try:
        print("Cargando datos a la base de datos...")
        load_data(df_clean)
    except Exception as e:  # noqa: F841
        logger.exception("Error durante la carga de datos")
        return

    print("Datos cargados con éxito.")
