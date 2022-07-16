from rest_framework import generics, permissions
from app.serializers.SODSerializers import SODSerializer
from app.models import SOD


class SODCreate(generics.CreateAPIView):
    queryset = SOD.objects.all()
    serializer_class = SODSerializer
    permission_classes = (permissions.IsAdminUser,)


class SODList(generics.ListAPIView):
    serializer_class = SODSerializer
    permission_classes = (permissions.IsAdminUser,)
    lookup_field = "application_hash"

    def get_queryset(self):
        application_hash = self.kwargs.get(self.lookup_field)
        return SOD.objects.filter(application_id__application_hash=application_hash)


class SODDelete(generics.DestroyAPIView):
    queryset = SOD.objects.all()
    serializer_class = SODSerializer
    permission_classes = (permissions.IsAdminUser,)
