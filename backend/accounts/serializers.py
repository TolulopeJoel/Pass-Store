from django.contrib.auth import get_user_model
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = get_user_model().objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'password')


class RegisterUserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    password = serializers.CharField(min_length=8, write_only=True)
    password2 = serializers.CharField(write_only=True)
    
    class Meta:
        model = get_user_model()
        fields = [
            'id',
            'email',
            'first_name',
            'last_name',
            'username',
            'password',
            'password2'
        ]

    def create(self, validated_data):
        validated_data.pop('password2')
        user = get_user_model().objects.create(**validated_data)
        return user

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')

        if password != password2:
            raise serializers.ValidationError('Passwords must match')
        return attrs
