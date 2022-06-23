from rest_framework import serializers
from app.models import ExceptionRules, Application, Asset, Action
from django.contrib.auth.models import User


class ExceptionsSerializer(serializers.ModelSerializer):
    application_hash = serializers.CharField(source="application_id.application_hash")
    exception_for_email = serializers.EmailField(source="exception_for.email")

    class Meta:
        model = ExceptionRules
        fields = (
            "exception_rule_id",
            "exception_rule_name",
            "exception_rule_description",
            "asset_id",
            "action_id",
            "application_hash",
            "exception_rule_approval_required",
            "exception_rule_created_date",
            "exception_rule_created_by",
            "exception_for_email",
        )
        read_only_fields = (
            "exception_rule_id",
            "exception_rule_created_date",
            "exception_rule_created_by",
        )

    def save(self, **kwargs):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

        return ExceptionRules.objects.update_or_create(
            exception_rule_id=self.instance.pk if (self.instance) else None,
            defaults={
                "exception_rule_name": self.validated_data["exception_rule_name"],
                "exception_rule_description": self.validated_data[
                    "exception_rule_description"
                ],
                "asset_id": self.validated_data["asset_id"],
                "action_id": self.validated_data["action_id"],
                "application_id": Application.objects.get(
                    application_hash=self.validated_data["application_id"][
                        "application_hash"
                    ]
                ),
                "exception_rule_created_by": user,
                "exception_for": User.objects.get(
                    email=self.validated_data["exception_for"]["email"]
                ),
            },
        )

    def validate(self, data):
        if (data["asset_id"] is None) or (data["asset_id"] == ""):
            raise serializers.ValidationError("Asset is required")
        if (data["action_id"] is None) or (data["action_id"] == ""):
            raise serializers.ValidationError("Action is required")

        if Asset.objects.filter(asset_id=data["asset_id"].asset_id).count() == 0:
            raise serializers.ValidationError("Asset does not exist")

        if Action.objects.filter(action_id=data["action_id"].action_id).count() == 0:
            raise serializers.ValidationError("Action does not exist")

        if (
            Asset.objects.get(
                asset_id=data["asset_id"].asset_id
            ).application_id.application_hash
            != data["application_id"]["application_hash"]
        ):
            raise serializers.ValidationError(
                "Asset does not belong to this application"
            )

        if (
            Action.objects.get(
                action_id=data["action_id"].action_id
            ).application_id.application_hash
            != data["application_id"]["application_hash"]
        ):
            raise serializers.ValidationError(
                "Action does not belong to this application"
            )

        return data
