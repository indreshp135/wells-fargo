from rest_framework import serializers
from app.models import SOD


class SODSerializer(serializers.ModelSerializer):
    class Meta:
        model = SOD
        fields = ("sod_code", "sod_name")
