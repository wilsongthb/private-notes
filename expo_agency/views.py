from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import viewsets
from expo_agency import models, serializers
from rest_framework import permissions, filters
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import Http404
import django_filters.rest_framework
from datetime import datetime
from django.http import HttpResponse
# Create your views here.


class ClientViewSet(viewsets.ModelViewSet):
    queryset = models.Client.objects.all()
    serializer_class = serializers.ClientSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer
    filterset_fields = ['type']
    #  filter_backends = [filters.SearchFilter, django_filters.rest_framework.DjangoFilterBackend]
    search_fields = ['name']
    #  permission_classes = [permissions.IsAuthenticated]


class ReserveViewSet(viewsets.ModelViewSet):
    queryset = models.Reserve.objects.all().filter(deleted_at__isnull=True)
    serializer_class = serializers.ReserveSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['client_id']

    def destroy(self, request, pk=None):
        reserve = models.Reserve.objects.get(pk=pk)
        reserve.deleted_at = datetime.now()
        reserve.save()
        return HttpResponse()


@api_view(['GET'])
def get_current_client(request):
    client = models.Client.objects.filter(user_id=request.user.id).first()
    response = Response()
    if client is not None:
        response.data = serializers.ClientSerializer(client).data
        return response
    else:
        raise Http404()


#  @api_view(['GET'])
#  def get_current_user(request):
#      user = User.objects.get(pk=request.user.id)
#      response = Response()
#      if user is not None:
#          response.data = serializers.UserSerializer(user).data
#          return response
#      else:
#          raise Http404()
