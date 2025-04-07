# Shopping Trends - ETL, API REST y Dashboard de Análisis

## 📌 Descripción general

Solución end-to-end para el análisis de tendencias de compra. El sistema extrae datos de transacciones (3,900+ registros), los transforma con Python/Pandas, los almacena en PostgreSQL y los expone a través de una API REST para su visualización en un dashboard interactivo.

**Tecnologías**:
- **ETL**: Pandas, Celery
- **Backend**: Django REST Framework (DRF), PostgreSQL
- **Frontend**: Next.js, TypeScript, Shadcn/ui
- **Infraestructura**: Docker-compose

---

## 🚀 Funcionalidades Clave

### ETL
- Ingesta de datos simulando una carga desde S3 (archivo CSV local).
- Limpieza y transformación de datos con Pandas.
- Normalización del dataset en un modelo relacional (clientes, productos, transacciones).
- Carga optimizada a PostgreSQL utilizando inserciones masivas (`bulk_create`).
- Estructura preparada para ejecución periódica con Celery (actualizaciones automáticas).

### API REST
- Endpoints organizados por recurso: clientes, productos, ventas.
- Soporte para filtros y búsquedas por parámetros clave.
- Documentación generada automáticamente con Swagger / OpenAPI.
- Validación de datos y manejo de errores consistente.

### Dashboard Interactivo
- Visualización de KPIs: ventas totales, productos más vendidos, ingresos promedio por categoría.
- Gráficos dinámicos integrados con Chart.js o Recharts.
- Filtros interactivos por categoría, temporada y método de pago.
- Interfaz moderna desarrollada en Next.js con TypeScript y Shadcn/ui.

### Infraestructura
- Proyecto dockerizado: backend, frontend y base de datos.
- Scripts reproducibles para carga de datos y entorno local.
- Preparado para integración continua y despliegue automatizado.

---

## ✅ TODO

### **Setup Inicial**
- [X] Estructura de proyecto (backend/frontend/data)
- [X] Setup de Django y DRF
- [X] Configurar Docker-compose
- [X] Crear modelos base

### **ETL**
- [X] Crear script para limpiar y validar data
- [X] Crear script para cargar data
- [X] Optimizar carga con `bulk_create`
- [X] Crear task para ejecutar el proceso ETL de forma programada
- [X] Hacer pruebas de `clean_data` y `load_data`
- [X] Añadir management command para correr ETL manualmente
- [?] Simular actualizaciones periódicas con Celery

### **API**
- [X] Crear endpoint `/api/customers/insights/` para ver Customer Insights
- [X] Implementar filtros dinámicos
- [X] Añadir anotaciones y agregaciones a los insights
- [ ] Hacer pruebas del endpoint con distintos filtros y combinaciones
- [ ] Cachear resultados e invalidarlos cuando se cargue nueva data

### **Frontend**
- [ ] ...

### **Deployment**
- [ ] ...

---

## Decisiones Técnicas

### 🗄️ Modelado de la Base de Datos

Se normalizó la información en cuatro tablas principales: Clientes, Productos, Variantes de Productos y Órdenes. Se definieron índices en los campos que se anticipan como los más utilizados para filtrar la información en el panel de control. Se establecieron valores predeterminados (`defaults`) para campos donde la ausencia de datos no afectaría significativamente el análisis estadístico. También se identificaron los campos obligatorios, cuya ausencia resultaría en la exclusión del registro para mantener la integridad de los datos esenciales.

### 🧼 Limpieza y Validación de Datos (ETL)

Se diseñó una función de limpieza (`clean_data`) que valida la estructura del archivo CSV, descarta filas incompletas o duplicadas y aplica reglas de normalización para asegurar la coherencia de los datos antes de cargarlos en la base de datos. Se descartaron registros sin campos críticos como ID del cliente, producto o monto de compra, y se eliminaron duplicados basados en `customer id`, que se asume como identificador único.

Se definieron valores por defecto basados en los modelos (`choices`) para los campos faltantes, como `"unknown"` para valores categóricos, `False` para booleanos, y mediana o moda para datos numéricos. Además, se estandarizó todo el texto a minúsculas y sin espacios extra, y se garantizó que cada producto tuviera una única categoría consistente, basada en la moda por nombre de producto.

### 📥 Carga de Datos en Base de Datos

Se implementó la función `load_data` para poblar las tablas del sistema utilizando el ORM de Django de forma eficiente y segura. Se empleó `bulk_create` para minimizar la cantidad de queries al insertar nuevos registros de clientes, productos, variantes y órdenes.

Para evitar errores por duplicados en clientes, se consultaron previamente los `customer_id` existentes en la base de datos y se excluyeron del conjunto a insertar. En lugar de utilizar `get_or_create` dentro de bucles —lo cual implicaría una gran cantidad de queries—, se construyeron diccionarios de búsqueda (`product_lookup`, `variant_lookup`, etc.) que mapean combinaciones clave como `(name, category, season)` para productos y `(product, size, color)` para variantes, permitiendo resolver referencias sin acceso repetido a la base de datos.

Una vez resueltas todas las relaciones con `Customer` y `ProductVariant`, se procedió a insertar las órdenes también mediante `bulk_create`. Este enfoque asegura una carga de datos robusta, eficiente y libre de errores de integridad, optimizada para grandes volúmenes de información.

---

## Futuras mejoras
- Agrupar colores de productos por sombras/color principal?

---
