from rest_framework import serializers
from django.contrib.auth.models import User
from app.models import Users


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "first_name", "last_name", "email", "id")


class wfUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ("user_id", "first_name", "last_name", "email", "location", "manager")
