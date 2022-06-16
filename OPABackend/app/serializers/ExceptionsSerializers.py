from rest_framework import serializers
from app.models import ExceptionRules, Application
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

        return ExceptionRules.objects.create(
            exception_rule_name=self.validated_data["exception_rule_name"],
            exception_rule_description=self.validated_data[
                "exception_rule_description"
            ],
            asset_id=self.validated_data["asset_id"],
            action_id=self.validated_data["action_id"],
            application_id=Application.objects.get(
                application_hash=self.validated_data["application_id"][
                    "application_hash"
                ]
            ),
            exception_rule_created_by=user,
            exception_for=User.objects.get(
                email=self.validated_data["exception_for"]["email"]
            ),
        )
