.PHONY: etl test test_module shell migrate

# Capturar el argumento como variable
$(eval FILE := $(word 2, $(MAKECMDGOALS)))

# Ejecutar ETL con un archivo CSV
etl:
	@if [ -z "$(FILE)" ]; then \
		echo "Debes especificar la ruta al archivo CSV. Ej: make etl /data/shopping_trends.csv"; \
		exit 1; \
	fi
	@python manage.py run_etl $(FILE)

# Correr TODOS los tests
test:
	python manage.py test

# Correr tests de un módulo específico: make test_module module=etl
test_module:
ifndef module
	$(error Debes especificar el módulo. Ej: make test_module module=etl)
endif
	python manage.py test $(module)

# Entrar al shell de Django
shell:
	python manage.py shell

# Aplicar migraciones
migrate:
	python manage.py migrate

# Comando por defecto
.DEFAULT_GOAL := test
