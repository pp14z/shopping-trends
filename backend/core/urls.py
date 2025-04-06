from rest_framework.routers import DefaultRouter

from .views import CustomerInsightsViewSet

router = DefaultRouter()
router.register(
    "customers/insights", CustomerInsightsViewSet, basename="customer_insights"
)

urlpatterns = router.urls
