from app.models import File, Folder
from rest_framework import serializers
import uuid


class FileSerializer(serializers.Serializer):
    file = serializers.FileField()
    folder_slug = serializers.CharField(max_length=100)
    file_name = serializers.CharField(max_length=100, read_only=True)
    extension = serializers.CharField(max_length=100, read_only=True)
    file_random_name = serializers.CharField(max_length=100, read_only=True)

    class Meta:
        fields = ["file", "folder_slug", "file_name", "file_random_name", "extension"]
        extra_kwargs = {
            "file": {"write_only": True},
            "folder_slug": {"write_only": True},
        }

    def save(self, **kwargs):
        file_uploaded = self.validated_data["file"]
        folder_slug = self.validated_data["folder_slug"]
        file_name = file_uploaded.name
        extension = file_name.split(".")[-1]
        random_name = str(uuid.uuid4()) + file_name
        folder = Folder.objects.get(folder_slug=folder_slug)
        self.validated_data["file_name"] = file_name
        self.validated_data["extension"] = extension
        self.validated_data["file_random_name"] = random_name

        return File.objects.create(
            file_name=file_name,
            folder=folder,
            file_random_name=random_name,
            file=file_uploaded,
        )


class FileList(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ["file_name", "file_random_name", "folder"]
