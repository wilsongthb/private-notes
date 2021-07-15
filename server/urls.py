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
from expo_agency.api_routes import router as expo_agency_routes
from expo_agency.views import get_current_client
from notes.api_urls import router as notes_api_routes
from django.conf.urls.static import static
from django.conf import settings



urlpatterns = [
    #  path('', views.index),
    # login de la vista del api
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(notes_api_routes.urls)),
    path('api_expo_agency/clients/me/', get_current_client),
    #  path('api_expo_agency/me/', get_current_user),
    path('api_expo_agency/', include(expo_agency_routes.urls)),
    path('admin/', admin.site.urls),
    # user profile ref: https://djoser.readthedocs.io/en/latest/base_endpoints.html
    url(r'^api/auth/', include('djoser.urls')),
    # REST AUTH SYSTEM ref: https://djoser.readthedocs.io/en/latest/token_endpoints.html
    url(r'^api/auth/', include('djoser.urls.authtoken')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
