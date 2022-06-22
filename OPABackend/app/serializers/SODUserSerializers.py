from rest_framework import serializers
from app.models import SodUser, Application


class SodUserSerializer(serializers.ModelSerializer):
    application_hash = serializers.CharField(source="application_id.application_hash")

    class Meta:
        model = SodUser
        fields = ("soduser_id", "user_id", "sod_code", "application_hash")

    def save(self, **kwargs):

        return SodUser.objects.create(
            user_id=self.validated_data["user_id"],
            sod_code=self.validated_data["sod_code"],
            application_id=Application.objects.get(
                application_hash=self.validated_data["application_id"][
                    "application_hash"
                ]
            ),
        )
