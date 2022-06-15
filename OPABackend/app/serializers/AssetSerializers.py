from rest_framework import serializers
from app.models import Asset
from datetime import datetime


class AssetListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = ("asset_id", "asset_name", "created_at", "created_by")


class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = ["asset_name"]

    def save(self, **kwargs):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

        return Asset.objects.create(
            **self.validated_data, created_by=user, created_at=datetime.now()
        )
