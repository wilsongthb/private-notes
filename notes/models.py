from django.db import models
from django.core.validators import validate_slug
from datetime import date, timedelta, datetime
from string import Template
from django.utils.translation import gettext_lazy as _
# Create your models here.


class BaseModel(models.Model):
    """
    Modelo base para la app
    """
    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text='Fecha de creacion del registro'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        help_text='Fecha de modificacion'
    )
    deleted_at = models.DateTimeField(
        null=True,
        editable=False,
        help_text='Fecha de eliminacion, nulo en caso aun no esta eliminado')

    class Meta:
        abstract = True
        get_latest_by = 'created_at'
        ordering = ['-created_at', '-updated_at']


class Contact(BaseModel):
    """ Personas, Empresas, etc """
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    email = models.CharField(max_length=255, null=True)  # opcional
    address = models.CharField(max_length=255, null=True)  # opcional
    dni = models.CharField(max_length=8, null=True)  # en caso de personas

    def __str__(self):
        #  return '%s: %s' % (self.phone_number, self.name)
        return self.name
    #  def debts_amount(self):
    #      return Note.objects.filter(contact_id=self.id)
    #          .filter(deleted_at__isnull=True)
    #          .


class Program(BaseModel):
    """ Conjunto de actividades """
    slug = models.CharField(max_length=15,
                            validators=[validate_slug],
                            help_text="Nombre en clave")
    name = models.CharField(max_length=255, help_text="Nombre decriptivo")

    def __str__(self):
        return self.slug


class ProgramActivity(BaseModel):
    program = models.ForeignKey(Program, on_delete=models.PROTECT)
    activity = models.CharField(
        max_length=255, null=True, help_text="el texto de la actividad, puede usar $contactName y $programSlug")
    days = models.IntegerField(null=True)

    def __str__(self):
        return f"{self.program.slug} - {self.activity}"


#  class Activity(BaseModel):
#      description = models.CharField(max_length=255)
#      contact = models.ForeignKey(Contact, on_delete=models.PROTECT)
#      ini_time = models.DateTimeField(null=False)  # required
#      end_time = models.DateTimeField(null=True)  # opcional


class Note(BaseModel):
    class Types(models.IntegerChoices):
        NOTA = 1, _('Nota')
        ACTIVIDAD = 2, _('Actividad')
        RECORDATORIO = 3, _('Recordatorio')
    text = models.TextField(max_length=750)
    program = models.ForeignKey(Program, on_delete=models.PROTECT, null=True,
                                default=None,
                                help_text="El programa del cual se programa las actividades como notas futuras")
    contact = models.ForeignKey(Contact, on_delete=models.PROTECT)
    amount = models.DecimalField(
        max_digits=10, decimal_places=2, default=0, help_text='Monto a pagar')
    amount_paid = models.DecimalField(
        max_digits=10, decimal_places=2, default=0, help_text='Monto pagado')
    # una fecha no tiene sentido, ya mejor guardamos fecha y hora
    #  dated_at = models.DateField(
    #      null=False, help_text="Fecha en la libreta")
    init_at = models.DateTimeField(
        default=datetime.now,
        help_text="Fecha y hora de inicio programado")
    ends_at = models.DateTimeField(
        null=True, help_text="Fecha y hora de finalizacion programada")
    done_at = models.DateTimeField(
        null=True, help_text="Tiempo en donde se marca como finalizado")
    type = models.PositiveSmallIntegerField(
        default=1, help_text="Tipo de nota", choices=Types.choices)
    patern_note_id = models.PositiveBigIntegerField(
        null=True, help_text="Nota origen")

    def __str__(self):
        return f"{self.id} - {self.text}"

    def type_label(self):
        return self.Types(self.type).label

    def contact_name(self):
        return str(self.contact)

    def program_slug(self):
        return self.program.slug if self.program_id is not None else None

    def addActivitiesFromProgram(self, program_id):
        program = Program.objects.get(id=program_id)
        programActivities = ProgramActivity.objects.filter(
            program_id=program_id)
        if len(programActivities) > 0:
            for activity in programActivities:
                daysToAdd = timedelta(activity.days)
                init_at = self.init_at + daysToAdd
                template = Template(activity.activity)
                futureNote = Note(
                    patern_note_id=self.id,
                    init_at=init_at,
                    text=template.substitute(
                        contactName=self.contact.name, programSlug=program.slug),
                    type=self.Types.RECORDATORIO,
                    contact_id=self.contact_id
                )
                futureNote.save()


class Payment(BaseModel):
    note = models.ForeignKey(Note, on_delete=models.PROTECT)
    contact = models.ForeignKey(Contact, on_delete=models.PROTECT)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    description = models.CharField(
        max_length=255, null=True)  # concepto opcional


#  class NotePayment(models.Model):
#      note = models.ForeignKey(Note, on_delete=models.CASCADE)
#      payment = models.ForeignKey(ContactPayment, on_delete=models.CASCADE)

#  class NoteActivity(BaseModel):
#      note = models.ForeignKey(Note, on_delete=models.PROTECT)
#      activity = models.ForeignKey(
#          ProgramActivity, on_delete=models.PROTECT, null=True)
#      observation = models.TextField(
#          max_length=255, null=False, help_text='Texto descriptivo de la actividad')
#      ini_time = models.DateTimeField(
#          null=False, help_text="Fecha de inicio de la actividad")
#      done_at = models.DateTimeField(null=True,
#                                     default=None,
#                                     help_text="Fecha de Realizacion")

#      def contact_phone_number(self):
#          return self.note.contact.phone_number

#      def contact_name(self):
#          return self.note.contact.name

#      def __str__(self):
#          return self.ini_time
    #  end_time = models.DateTimeField(
    #      null=True, help_text='Fecha de finalizacion, aplicable en ciertos casos')
