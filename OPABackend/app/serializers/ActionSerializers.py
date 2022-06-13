from rest_framework import serializers
from app.models import Action


class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = ("action_id", "action_name")
