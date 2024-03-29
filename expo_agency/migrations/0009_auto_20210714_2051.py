# Generated by Django 3.2.4 on 2021-07-14 20:51

import django.core.validators
from django.db import migrations, models
import expo_agency.models


class Migration(migrations.Migration):

    dependencies = [
        ('expo_agency', '0008_auto_20210714_2029'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='location',
            field=models.CharField(help_text='Nombre de la ubicacion del destino', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='rating',
            field=models.DecimalField(decimal_places=1, default=3, help_text='En el rango de 1 a 5 estrellas', max_digits=2, validators=[expo_agency.models.validate_positive, django.core.validators.MaxValueValidator(5), django.core.validators.MinValueValidator(0)]),
        ),
    ]
