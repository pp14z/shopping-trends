from django.core.management.base import BaseCommand

from etl.tasks import run_etl


class Command(BaseCommand):
    help = "Ejecuta el proceso ETL desde un archivo CSV"

    def add_arguments(self, parser):
        parser.add_argument("csv_path", type=str, help="Ruta al archivo CSV de entrada")

    def handle(self, *args, **options):
        csv_path = options["csv_path"]
        run_etl(csv_path)
        self.stdout.write(self.style.SUCCESS("Proceso ETL finalizado."))
