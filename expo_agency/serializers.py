from django.contrib.auth.models import User, Group
from rest_framework import serializers
from expo_agency.models import Client, Product, Reserve, TourActivity, ProductImage


class ClientSerializer(serializers.HyperlinkedModelSerializer):
    user_id = serializers.IntegerField()

    class Meta:
        model = Client
        fields = [
            'id',
            'name',
            'lastname',
            'idcard',
            'birth_date',
            'country',
            'cellphone',
            'email',
            'user_id',
        ]


class TourActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = TourActivity
        fields = ['id', 'activity', 'time']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'order']


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    activities = TourActivitySerializer(many=True, read_only=True)
    gallery = ProductImageSerializer(many=True, read_only=True)
    services = serializers.SlugRelatedField(
        many=True, read_only=True, slug_field='text')
    advices = serializers.SlugRelatedField(
        many=True, read_only=True, slug_field='text')
    rating = serializers.IntegerField()

    class Meta:
        model = Product
        fields = [
            'id',
            'image',
            'name',
            'description',
            'price',
            'type',
            'service',
            'advice',
            'rating',
            'location',
            'activities',
            'gallery',
            'services',
            'advices'
        ]


class ReserveSerializer(serializers.HyperlinkedModelSerializer):
    client = ClientSerializer(many=False, read_only=True)
    client_id = serializers.IntegerField()
    #  product = ProductSerializer(many=False, read_only=True)
    product = serializers.StringRelatedField(many=False)
    product_id = serializers.IntegerField()

    class Meta:
        model = Reserve
        fields = [
            'id',
            'start_date',
            'end_date',
            'product',
            'price',
            'local_price',
            'is_local',
            'companion',
            'request_message',
            'client_id',
            'client',
            'product_id',
            'status'
        ]
        read_only_fields = ['product']

    #  def update(self, instance, validated_data):


#  class UserSerializer(serializers.ModelSerializer):
#      #  client = ClientSerializer(read_only=True, many=False)

#      class Meta:
#          model = User
#          fields = [
#              'id',
#              'email',
#              'first_name',
#              'last_name',
#              'username',
#              #  'client'
#          ]
