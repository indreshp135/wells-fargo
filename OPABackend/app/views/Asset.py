from rest_framework import generics, permissions
from app.serializers.AssetSerializers import AssetSerializer
from app.models import Asset


class AssetList(generics.ListCreateAPIView):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    permission_classes = (permissions.IsAuthenticated,)
