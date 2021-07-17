# Generated by Django 3.2.4 on 2021-07-16 19:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expo_agency', '0010_auto_20210714_2212'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='type',
            field=models.PositiveSmallIntegerField(choices=[(1, 'Lugar'), (2, 'Tour Clasico'), (3, 'Tour Especial')], default=1, help_text='Tipo de tour o producto'),
        ),
    ]
