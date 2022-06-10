from rest_framework import serializers
from app.models import Asset


class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = ("asset_id", "asset_name")
