# Generated by Django 3.2.4 on 2021-07-28 11:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expo_agency', '0016_merge_20210728_1106'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(help_text='Imagen referencial principal', upload_to='images'),
        ),
    ]