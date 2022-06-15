from rest_framework import serializers
from app.models import Action
from datetime import datetime


class ActionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = ("action_id", "action_name", "created_at", "created_by")


class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = ["action_name"]

    def save(self, **kwargs):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

        return Action.objects.create(
            **self.validated_data, created_by=user, created_at=datetime.now()
        )
