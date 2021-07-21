from django.db import models
from django.contrib.auth.models import User
#  from django.contrib.postgres.validators import RangeMaxValueValidator, RangeMinValueValidator
from django.core.validators import MinValueValidator, MaxValueValidator
from notes.models import BaseModel


def validate_positive(value):
    """
    Comprueba que un valor es positivo
    """
    if value < 0:
        raise ValidationError(
            _("%(value)s is not positive."),
            params={"value": value}
        )


# Create your models here.


class Client(BaseModel):
    name = models.CharField(
        max_length=150, help_text="Nombre del turista/cliente")
    lastname = models.CharField(
        max_length=150, help_text="sub nombre del turista/cliente")
    idcard = models.CharField(null=True, max_length=20, help_text="DNI/IDCARD")
    birth_date = models.DateField(null=True, help_text="Fecha de nacimiento")
    country = models.CharField(max_length=255, help_text="Pais de origen")
    cellphone = models.CharField(max_length=20, help_text="numero de celular")
    email = models.CharField(max_length=20, help_text="Correo electronico")
    user = models.ForeignKey(
        User, null=True,
        on_delete=models.CASCADE,
        help_text="El usuario relacionado al cliente participante",
        related_name="client"
    )


class Product(BaseModel):
    """
    Modelo para guardar los tours
    """
    PRODUCT_TYPES = [
        (1, 'Lugar'),
        (2, 'Tour Clasico'),
        (3, 'Tour Especial'),
    ]
    image = models.ImageField(
        upload_to="images", help_text="Imagen referencial principal")
    name = models.CharField(max_length=255, help_text="Nombre del tour")
    location = models.CharField(
        null=True, max_length=255, help_text="Nombre de la ubicacion del destino, la direccion")
    description = models.TextField(
        max_length=5000, help_text="Descripcion en rich text")
    price = models.DecimalField(max_digits=10, decimal_places=2,
                                help_text="Costo en dolares o moneda internacional", validators=[validate_positive])
    # PositiveSmallIntegerField 0 - 32767
    type = models.PositiveSmallIntegerField(
        help_text="Tipo de tour o producto", default=1, choices=PRODUCT_TYPES)
    service = models.TextField(
        max_length=2500, null=True, help_text="Nota acerca de lo que incluye o no")
    advice = models.TextField(
        max_length=2500, null=True, help_text="Avisos, notas, detalles, etc.")
    rating = models.DecimalField(
        max_digits=2, decimal_places=1, default=3, validators=[
            validate_positive,
            MaxValueValidator(5),
            MinValueValidator(0)
        ],
        help_text="En el rango de 1 a 5 estrellas")

    def __str__(self):
        return self.name
    #  disclamer = models.TextField(
    #      max_length=1000, null=True, help_text="Nota acerca de lo que incluye o no")


class TourActivity(BaseModel):
    activity = models.CharField(max_length=255)
    time = models.CharField(max_length=10)  # HH:mma
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='activities')


class Reserve(BaseModel):
    RESERVE_STATUS = [
        (1, 'Solicitado'),
        (2, 'Aprobado'),
    ]
    status = models.PositiveSmallIntegerField(default=1)
    start_date = models.DateField()
    end_date = models.DateField()
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, help_text="El tour principal")
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    price = models.DecimalField(
        null=True, default=0,
        max_digits=10, decimal_places=2, validators=[validate_positive])
    local_price = models.DecimalField(
        null=True, default=0,
        max_digits=10, decimal_places=2, validators=[validate_positive])
    is_local = models.BooleanField(default=False)
    companion = models.PositiveSmallIntegerField(
        default=0, help_text="Numero de acompaniantes")
    request_message = models.TextField(
        max_length=1000, help_text="Mensaje adiciona de solicitud", null=True)


class ProductImage(BaseModel):
    """
    GALERIA DE IMAGENES DEL PRODUCTO
    """
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="gallery")
    image = models.ImageField(
        upload_to="product-galery",
        help_text="Imagenes de galeria para producto",
    )
    order = models.PositiveSmallIntegerField(default=1)

    class Meta:
        ordering = ['order']


class ProductService(models.Model):
    """
    Lista de servicios
    """
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="services")
    text = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.product.name} - {self.text}"


class ProductAdvice(models.Model):
    """
    Lista de avisos
    """
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="advices")
    text = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.product.name} - {self.text}"

#  class ReserveAdition(BaseModel):
#      reserve = models.ForeignKey(Reserve, on_delete=models.CASCADE)
#      product = models.ForeignKey(Product, on_delete=models.CASCADE)
#      price = models.DecimalField(
#          max_digits=10, decimal_places=2, validators=[validate_positive])
#      local_price = models.DecimalField(
#          max_digits=10, decimal_places=2, validators=[validate_positive])
