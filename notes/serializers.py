from django.contrib.auth.models import User, Group
from rest_framework import serializers
#  from notes.models import Entity, Note
from notes import models
from django.db.models import Sum


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email',
                  'groups', 'first_name', 'last_name']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Contact
        fields = ['id', 'created_at', 'name',
                  'phone_number', 'email', 'address', 'dni']


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Program
        fields = ['id', 'created_at', 'slug', 'name']


class ProgramActivitySerializer(serializers.ModelSerializer):
    program_id = serializers.IntegerField()

    class Meta:
        model = models.ProgramActivity
        fields = ['id', 'created_at', 'activity', 'days', 'program_id']


#  class NotePaymentSerializer(serializers.HyperlinkedModelSerializer):
#      note_id = serializers.IntegerField()
#      payment_id = serializers.IntegerField()

#      class Meta:
#          model = models.NotePayment
#          fields = ['id', 'note_id', 'payment_id']


class NoteSerializer(serializers.ModelSerializer):
    contact_id = serializers.IntegerField()
    program_id = serializers.IntegerField(allow_null=True)
    contact = ContactSerializer(many=False, read_only=True)

    class Meta:
        model = models.Note
        fields = ['id', 'created_at', 'text', 'contact_id',
                  'amount', 'amount_paid', 'program_slug',
                  'program_id', 'contact', 'init_at', 'ends_at', 'type_label']
        read_only_fields = ['program_slug', 'contact', 'type_label']

    def create(self, validated_data):
        note = models.Note(**validated_data)
        note.save()
        note.addActivitiesFromProgram(note.program_id)
        return note


class PaymentSerializer(serializers.ModelSerializer):
    contact_id = serializers.IntegerField()
    note_id = serializers.IntegerField()

    class Meta:
        model = models.Payment
        fields = ['id', 'amount', 'description',
                  'contact_id', 'created_at', 'updated_at', 'note_id']
        read_only_fields = ['created_at', 'updated_at']

    def create(self, validated_data):
        payment = models.Payment(**validated_data)
        payment.save()
        note = models.Note.objects.get(pk=payment.note_id)
        note.calculateAmountPaid()
        return payment


class AnnotationSerializer(serializers.ModelSerializer):
    #  program = ProgramSerializer(required=False)
    program_id = serializers.IntegerField(required=False, allow_null=True)

    class Meta:
        model = models.Annotation
        fields = ['created_at', 'text', 'date',
                  'reviewed_at', 'type', 'user_id', 'id',
                  'program_name', 'program_id'
                  ]
        read_only_fields = ['program_name']

    #  def get_validation_exclusions(self):
    #      return ['program_id']

    #  def create(self, validated_data):
    #      instance = models.Annotation(**validated_data)
    #      instance.save()
    #      return instance

    #  def update(self, instance, validated_data):
    #      if instance.program_id != validated_data.get('program_id'):
    #          print("mucho ojo cuate");
    #      NoteSerializer(instance, data=validated_data)
    #      instance.save()
    #      return instance

#  class NoteActivitySerializer(serializers.HyperlinkedModelSerializer):
#      #  note = NoteSerializer(many=False, read_only=True)

#      class Meta:
#          model = models.NoteActivity
#          fields = ['id', 'created_at', 'note_id', 'activity_id',
#                    'observation', 'ini_time', 'done_at', 'contact_phone_number']
#          read_only_fields = ['activity_id', 'note_id', 'contact_phone_number']
