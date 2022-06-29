from rest_framework import serializers


class AuthorizeSerializer(serializers.Serializer):
    user_email = serializers.CharField()
    app_hash = serializers.CharField()
