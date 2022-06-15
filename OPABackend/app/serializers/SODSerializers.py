from rest_framework import serializers
from app.models import SOD, Application


class SODSerializer(serializers.ModelSerializer):
    application_hash = serializers.CharField(source="application_id.application_hash")

    class Meta:
        model = SOD
        fields = ("sod_code", "sod_name", "application_hash")

    def save(self, **kwargs):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

        print(self.validated_data["application_id"])

        return SOD.objects.create(
            sod_name=self.validated_data["sod_name"],
            application_id=Application.objects.get(
                application_hash=self.validated_data["application_id"][
                    "application_hash"
                ]
            ),
            created_by=user,
        )
