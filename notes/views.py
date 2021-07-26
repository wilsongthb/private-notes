from django.db import transaction
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions, filters
from rest_framework.response import Response
from notes import serializers, models
from notes.models import Note
from django.http import HttpResponse
from datetime import datetime
from django.db.models import F
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view
from cryptography.fernet import Fernet
from django.conf import settings
from pathlib import Path

# Create your views here.


def index(request):
    return render(request, 'index.html')


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = serializers.GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class ContactViewSet(viewsets.ModelViewSet):
    queryset = models.Contact.objects.all().filter(deleted_at__isnull=True)
    serializer_class = serializers.ContactSerializer
    permission_classes = [permissions.IsAuthenticated]
    #  def get_queryset(self):
    #      queryset = models.Contact.objects.all().filter(deleted_at__isnull=True)
    #      sea
    #      if()
    #  filterset_fields = ['name']
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'dni', 'phone_number']


class ProgramViewSet(viewsets.ModelViewSet):
    queryset = models.Program.objects.all().filter(deleted_at__isnull=True)
    serializer_class = serializers.ProgramSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProgramActivityViewSet(viewsets.ModelViewSet):
    queryset = models.ProgramActivity.objects.all().filter(deleted_at__isnull=True)
    serializer_class = serializers.ProgramActivitySerializer
    permission_classes = [permissions.IsAuthenticated]


#  class ContactViewSet(viewsets.ModelViewSet):
#      queryset = Contact.objects.all().filter(deleted_at__isnull=True)
#      serializer_class = ContactViewSet
#      permission_classes = [permissions.IsAuthenticated]

#  class NotePaymentViewSet(viewsets.ModelViewSet):
#      queryset = models.NotePayment.objects.all()
#      serializer_class = serializers.NotePaymentSerializer
#      permission_classes = [permissions.IsAuthenticated]

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = models.Payment.objects.all().filter(deleted_at__isnull=True)
    serializer_class = serializers.PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['contact_id', 'note_id']

    def destroy(self, request, pk=None):
        pay = models.Payment.objects.get(pk=pk)
        pay.deleted_at = datetime.now()
        pay.save()
        pay.note.calculateAmountPaid()
        return HttpResponse('deleted ' + pk)


class NoteViewSet(viewsets.ModelViewSet):
    """
    API endpoint Entities
    """
    queryset = models.Note.objects.all().filter(deleted_at__isnull=True)
    serializer_class = serializers.NoteSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['contact_id']

    def get_queryset(self):
        queryset = models.Note.objects.all().filter(deleted_at__isnull=True)
        created_date = self.request.query_params.get('date')
        if created_date is not None:
            queryset = queryset.filter(init_at__date=created_date)
        debts = self.request.query_params.get('debts')
        if debts is not None:
            queryset = queryset.filter(amount__gt=F('amount_paid'))
        return queryset

    #  def create(self, request):
    #      noteSerialized = serializers.NoteSerializer(data=request.data, context={'request':request})
    #      if noteSerialized.is_valid():
    #          note = Note(**noteSerialized.validated_data)
    #      print(f"se supone que debe guardar, con id: {note}")
    #      return HttpResponse("hola loquitos")

    #  def update(self, request, pk=None):
    #      note = models.Note.objects.get(id=pk)
    #      serializers.NoteSerializer(note, data=request.data)
    #      note.save()
    #      return super().retrieve(request, pk)

    def destroy(self, request, pk=None):
        Note.objects.filter(id=pk).update(deleted_at=datetime.now())
        return HttpResponse('deleted ' + pk)


#  class NoteActivityViewSet(viewsets.ModelViewSet):
#      queryset = models.NoteActivity.objects.all().filter(deleted_at__isnull=True)
#      serializer_class = serializers.NoteActivitySerializer
#      permission_classes = [permissions.IsAuthenticated]

#      def get_queryset(self):
#          queryset = models.NoteActivity.objects.all().filter(deleted_at__isnull=True)
#          date = self.request.query_params.get('date')
#          if date is not None:
#              queryset = queryset.filter(ini_time__date=date)
#          return queryset

#      def destroy(self, request, pk=None):
#          Note.objects.filter(id=pk).update(deleted_at=datetime.now())
#          return HttpResponse('deleted ' + pk)


class AnnotationViewSet(viewsets.ModelViewSet):
    """
    Apuntes, en el caso la peticion contenga 
    """
    queryset = models.Annotation.objects.all().filter(
        deleted_at__isnull=True).order_by('-date')
    serializer_class = serializers.AnnotationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['date', 'type']
    search_fields = ['text', 'date']

    def create(self, request):
        print("aqui la prueba 🤡")
        print(request.data.get("program_id"))
        serializer = serializers.AnnotationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        if request.data.get('program_id') is not None and request.data['program_id'] > 0:
            #  print("estoy aqui chamo 🤡")
            #  print(request.data['program_id'])
            instance.addActivitiesFromProgram(request.data['program_id'])
        return Response(serializer.data)

    def update(self, request, pk=None):
        print("aqui la prueba 🤡")
        print(request.data.get("program_id"))
        print(type(request.data.get("program_id")))
        serializer = serializers.AnnotationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        preview = models.Annotation.objects.get(pk=pk)
        if preview.program_id is None and request.data.get('program_id') is not None:
            preview.addActivitiesFromProgram(request.data['program_id'])
        instance = serializer.save()
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        row = models.Annotation.objects.get(pk=pk)
        row.deleted_at = datetime.now()
        row.save()
        return HttpResponse('')



@api_view(['GET', 'POST'])
def encrypt_db(request):
    BASE_DIR = Path(__file__).resolve().parent.parent
    if request.method == 'GET':
        key = Fernet.generate_key()
        response = HttpResponse(key, content_type="application/x-iwork-keynote-sffkey")
        response['Content-Disposition'] = 'attachment; filename="key.key"'
        return response
        #  return Response({"message": "Hola amigo como estas, es la hora de jugar!"})
    elif request.method == 'POST':
        #  "application/vnd.sqlite3"
        key = open(BASE_DIR / "uploads/key.key", "rb").read()
        f = Fernet(key)
        with open(BASE_DIR / "db.sqlite3", "rb") as file:
            file_data = file.read()
            encrypted_data = f.encrypt(file_data)
            with open(BASE_DIR / "db.bin", "wb") as output_file:
                output_file.write(encrypted_data)
                output_file.close()
        return Response({"message": "He encriptado la informacion"})
