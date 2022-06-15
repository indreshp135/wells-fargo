from rest_framework import permissions
from rest_framework import generics
from app.models import Folder
from app.serializers.folders import (
    FolderListSerializer,
    FolderCreateSerializer,
    FolderSerializer,
)


class FolderList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    queryset = Folder.objects.all()

    def get_serializer_class(self):
        if self.request.method == "GET":
            return FolderListSerializer
        elif self.request.method == "POST":
            return FolderCreateSerializer
