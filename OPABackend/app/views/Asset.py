from rest_framework import generics, permissions
from app.serializers.AssetSerializers import AssetSerializer, AssetListSerializer
from app.models import Asset


class AssetList(generics.ListAPIView):
    serializer_class = AssetListSerializer
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = "application_hash"

    def get_queryset(self):
        return Asset.objects.filter(
            application_id__application_hash=self.kwargs["application_hash"]
        )


class AssetCreate(generics.CreateAPIView):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    permission_classes = (permissions.IsAuthenticated,)
