from rest_framework import generics, permissions
from app.serializers.AssetSerializers import AssetSerializer, AssetListSerializer
from app.models import Asset


class AssetList(generics.ListCreateAPIView):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_serializer_class(self):
        if self.request.method == "GET":
            return AssetListSerializer
        elif self.request.method == "POST":
            return AssetSerializer
