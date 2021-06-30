"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from notes import views
from rest_framework import routers
from expo_agency.api_routes import router as expo_agency_routes
from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
#  router.register(r'entities', views.EntityViewSet)
router.register(r'contacts', views.ContactViewSet)
router.register(r'programs', views.ProgramViewSet)
router.register(r'program-activities', views.ProgramActivityViewSet)
router.register(r'notes', views.NoteViewSet)
#  router.register(r'note-payments', views.NotePaymentViewSet)
router.register(r'payments', views.PaymentViewSet)
#  router.register(r'note-activities', views.NoteActivityViewSet)

urlpatterns = [
    path('', views.index),
    # login de la vista del api
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api_expo_agency/', include(expo_agency_routes.urls)),
    path('admin/', admin.site.urls),
    # user profile ref: https://djoser.readthedocs.io/en/latest/base_endpoints.html
    url(r'^api/auth/', include('djoser.urls')),
    # REST AUTH SYSTEM ref: https://djoser.readthedocs.io/en/latest/token_endpoints.html
    url(r'^api/auth/', include('djoser.urls.authtoken')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
