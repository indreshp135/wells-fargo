from rest_framework import generics, permissions
from app.models import SodUser
from app.serializers.SODUserSerializers import SodUserSerializer


class SODUserCreate(generics.CreateAPIView):
    queryset = SodUser.objects.all()
    serializer_class = SodUserSerializer
    permission_classes = (permissions.IsAuthenticated,)
