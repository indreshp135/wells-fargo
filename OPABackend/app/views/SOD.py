from rest_framework import generics, permissions
from app.serializers.SODSerializers import SODSerializer
from app.models import SOD


class SODList(generics.ListCreateAPIView):
    queryset = SOD.objects.all()
    serializer_class = SODSerializer
    permission_classes = (permissions.IsAuthenticated,)
