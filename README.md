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
- [X] Hacer pruebas del endpoint con distintos filtros y combinaciones
- [X] Configurar GitHub Actions para ejecutar pruebas del backend con Docker
- [X] Cachear resultados e invalidarlos cuando se cargue nueva data
- [X] Generar documentación del API

### **Frontend**
- [X] Configuracion inicial del proyecto
- [X] Configurar rutas y estructura base del proyecto
- [X] Instalar y configurar Shadcn/UI y Recharts
- [ ] Configurar react-query y filtros

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

### 📊 Diseño del API

El endpoint `/api/customers/insights/` fue diseñado para proporcionar estadísticas clave sobre los clientes y sus patrones de compra a través de una única consulta altamente personalizable. Algunas decisiones clave:

- **Queryset principal:** Se utiliza `Order.objects.select_related(...)` como base, ya que los filtros como categoría de producto o frecuencia de compra dependen tanto de los datos del cliente como del producto. A partir de las órdenes se construye el conjunto de clientes únicos.

- **Filtrado:** Se implementó `DjangoFilterBackend` con una clase de filtro personalizada `CustomerInsightsFilter`, lo que permite aplicar filtros como `gender`, `age range`, `subscription`, `purchase frequency`, y `product category` directamente desde los query params del cliente.

- **Agregaciones:** Las métricas como `total_sales`, `average_order_value`, `avg_review_rating`, etc., se calculan usando agregaciones (`Avg`, `Sum`, `Count`) directamente sobre el queryset filtrado.

- **Distribuciones:** Para visualizaciones front-end como gráficos de barras o stacked charts, se generaron distribuciones pivotadas por género (ej. `customer_distribution_by_age`, `total_sales_by_category_gender`, etc.) usando una utilidad (`pivot_grouped_by_gender`) que transforma los resultados en un formato amigable para el frontend.

- **Rendimiento:** Se implementó caching con invalidación automática cuando se corre nuevamente el ETL. La clave del cache se construye a partir de los filtros aplicados.

- **Documentación OpenAPI:** Se usó `drf-spectacular` para documentar parámetros de filtro, estructuras de respuesta y tipos de datos, asegurando que el frontend tenga una referencia clara de cómo consumir el endpoint.

---

## Futuras mejoras
- Agrupar colores de productos por sombras/color principal
- Filtros cargados dinamicamente desde el API
- Implementar Factory Boy para generar datos de prueba de forma más mantenible
- Usar Redis como caché para mejor escalabilidad
- Implementar autenticación y autorización para el API
- Añadir pipeline de CI/CD completo (staging, production)

---
