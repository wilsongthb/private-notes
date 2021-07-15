from django.contrib import admin
from expo_agency.models import Product, TourActivity, ProductImage, Reserve

# Register your models here.
@admin.register(Product, TourActivity, ProductImage, Reserve)
class ExpoAgencyAdmin(admin.ModelAdmin):
    pass
