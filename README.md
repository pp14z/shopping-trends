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
- [ ] Crear script de carga inicial con Pandas
- [ ] Optimizar con `bulk_create`
- [ ] Limpiar datos (nulos, formatos)
- [ ] Simular actualizaciones periódicas con Celery

### **API**
- [ ] ...

### **Frontend**
- [ ] ...

### **Deployment**
- [ ] ...

---

## Decisiones Técnicas

### 🗄️ Modelado de la Base de Datos

Se normalizó la información en cuatro tablas principales: Clientes, Productos, Variantes de Productos y Órdenes. Se definieron índices en los campos que se anticipan como los más utilizados para filtrar la información en el panel de control. Se establecieron valores predeterminados (`defaults`) para campos donde la ausencia de datos no afectaría significativamente el análisis estadístico. También se identificaron los campos obligatorios, cuya ausencia resultaría en la exclusión del registro para mantener la integridad de los datos esenciales.

### 🔍 Validación y limpieza de datos

Antes de cargar los datos en la base de datos, el archivo CSV pasa por un proceso de validación y limpieza dentro de la función `clean_data()`.

- Se verifica que el archivo contenga todas las columnas requeridas.
- Se ignoran columnas adicionales que no forman parte del esquema esperado.
- Se valida que los tipos de datos sean consistentes con cada campo.
- Se comprueba que valores críticos tengan valores válidos (por ejemplo: `"Yes"`/`"No"` en campos booleanos).

### 🧨 Filtrado de filas inválidas
Las filas que contienen datos faltantes en alguno de los siguientes campos críticos se descartan completamente:

- `Customer ID` (identificador de cliente)
- `Item Purchased` (producto comprado)
- `Purchase Amount (USD)` (monto de la compra)

Estas columnas son necesarias para mantener la integridad de las relaciones y para el cálculo correcto de métricas.

--

## Futuras mejoras
- Agrupar colores de productos por sombras/color principal?
- 

--


