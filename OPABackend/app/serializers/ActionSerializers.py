from rest_framework import serializers
from app.models import Action, Application


class ActionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = ("action_id", "action_name", "created_at", "created_by")


class ActionSerializer(serializers.ModelSerializer):
    application_hash = serializers.CharField(source="application_id.application_hash")

    class Meta:
        model = Action
        fields = ["action_name", "application_hash"]

    def save(self, **kwargs):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

        return Action.objects.create(
            action_name=self.validated_data["action_name"],
            application_id=Application.objects.get(
                application_hash=self.validated_data["application_id"][
                    "application_hash"
                ]
            ),
            created_by=user,
        )

    def validate(self, data):
        if (data["application_id"] is None) or (data["application_id"] == ""):
            raise serializers.ValidationError("Application is required")

        if (
            Application.objects.filter(
                application_hash=data["application_id"]["application_hash"]
            ).count()
            == 0
        ):
            raise serializers.ValidationError("Application does not exist")

        return data
