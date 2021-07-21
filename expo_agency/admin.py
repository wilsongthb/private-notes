from django.contrib import admin
from expo_agency.models import Product, TourActivity, ProductImage, Reserve, ProductAdvice, ProductService

# Register your models here.
@admin.register(Product, TourActivity, ProductImage, Reserve, ProductAdvice, ProductService)
class ExpoAgencyAdmin(admin.ModelAdmin):
    pass
