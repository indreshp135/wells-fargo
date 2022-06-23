from rest_framework import serializers
from app.models import Asset, Application


class AssetListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = ("asset_id", "asset_name", "created_at", "created_by")


class AssetSerializer(serializers.ModelSerializer):
    application_hash = serializers.CharField(source="application_id.application_hash")

    class Meta:
        model = Asset
        fields = ["asset_name", "application_hash"]

    def save(self, **kwargs):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

        return Asset.objects.create(
            asset_name=self.validated_data["asset_name"],
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
