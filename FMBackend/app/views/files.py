from rest_framework import generics, permissions
from app.serializers.files import FileSerializer, FileList
from rest_framework.parsers import MultiPartParser, FormParser
from app.models import File
from app.permissions import (
    FileDeletePermissions,
    FileReadPermissions,
    FileUploadPermissions,
)


class UploadView(generics.CreateAPIView):
    parser_classes = (
        MultiPartParser,
        FormParser,
    )
    permission_classes = [permissions.IsAuthenticated, FileUploadPermissions]
    queryset = File.objects.all()
    serializer_class = FileSerializer


class FileDeleteView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, FileDeletePermissions]
    queryset = File.objects.all()
    serializer_class = FileSerializer
    lookup_field = "file_random_name"


class FileListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, FileReadPermissions]

    serializer_class = FileList
    lookup_field = "folder"

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def get_queryset(self):
        folder = self.kwargs["folder"]
        return File.objects.filter(folder__folder_slug=folder)
