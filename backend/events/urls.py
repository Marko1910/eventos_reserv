from rest_framework import routers
from .views import TipoEventoViewSet, EventoViewSet

router = routers.DefaultRouter()
router.register(r'tipos_evento', TipoEventoViewSet)
router.register(r'eventos', EventoViewSet)

urlpatterns = router.urls
