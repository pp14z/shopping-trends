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
- [ ] Configurar Docker-compose

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
