from rest_framework import serializers
from app.models import Folder


class FolderCreateSerializer(serializers.ModelSerializer):
    folder_name = serializers.CharField(max_length=100)

    class Meta:
        model = Folder
        fields = ["folder_name"]


class FolderListSerializer(serializers.ModelSerializer):
    folder_name = serializers.CharField(max_length=100)

    class Meta:
        model = Folder
        fields = ["folder_name", "folder_slug"]


class FolderSerializer(serializers.ModelSerializer):
    folder_name = serializers.CharField(max_length=100)

    class Meta:
        model = Folder
        fields = ["folder_name", "folder_slug"]
