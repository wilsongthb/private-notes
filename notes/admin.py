from django.contrib import admin
from notes.models import Program, ProgramActivity, Note, Annotation

# Register your models here.


@admin.register(Program, ProgramActivity, Note, Annotation)
class NotesAdmin(admin.ModelAdmin):
    pass
