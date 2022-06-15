from rest_framework import serializers
from app.models import SODRules


class SODRulesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SODRules
        fields = (
            "sod_rule_id",
            "sod_code",
            "asset_id",
            "action_id",
            "sod_rule_name",
            "sod_rule_description",
            "sod_rule_created_date",
            "sod_rule_updated_date",
        )
