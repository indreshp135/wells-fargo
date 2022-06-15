from rest_framework import generics, permissions
from app.serializers.ApplicationSerializers import (
    ApplicationSerializer,
    ApplicationListSerializer,
)
from app.models import Application


class ApplicationList(generics.ListCreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_serializer_class(self):
        if self.request.method == "GET":
            return ApplicationListSerializer
        elif self.request.method == "POST":
            return ApplicationSerializer
