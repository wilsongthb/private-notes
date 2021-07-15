from rest_framework import routers
from expo_agency import views

router = routers.DefaultRouter()
#  router.path('clients/me/', views.get_current_client)
router.register(r'clients', views.ClientViewSet)
router.register(r'products', views.ProductViewSet)
router.register(r'reserves', views.ReserveViewSet)
