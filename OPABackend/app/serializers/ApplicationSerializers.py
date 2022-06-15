from email.mime import application
from rest_framework import serializers
from app.models import Application
from datetime import datetime
from uuid import uuid4


class ApplicationListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = (
            "application_name",
            "created_at",
            "created_by",
            "application_description",
            "application_hash",
        )


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ["application_name", "application_description", "application_hash"]
        extra_kwargs = {"application_hash": {"read_only": True}}

    def save(self, **kwargs):
        application_hash = str(uuid4())
        self.validated_data["application_hash"] = application_hash
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

        return Application.objects.create(
            **self.validated_data, created_by=user, created_at=datetime.now()
        )

    def to_representation(self, instance):
        print(instance)
        ret = super(ApplicationSerializer, self).to_representation(instance)
        ret["application_hash"] = instance["application_hash"]
        return ret
