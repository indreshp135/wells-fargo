from rest_framework import serializers
from app.models import Users


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ("user_id", "first_name", "last_name", "email", "location", "manager")
