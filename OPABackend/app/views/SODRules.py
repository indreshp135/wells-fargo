from rest_framework import generics, permissions
from app.serializers.SODRulesSerializers import SODRulesSerializer
from app.models import SODRules


class SODRulesList(generics.ListAPIView):

    serializer_class = SODRulesSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        queryset = SODRules.objects.all()
        action_id = self.request.query_params.get("actionId")
        asset_id = self.request.query_params.get("assetId")
        sod_code = self.request.query_params.get("sodCode")
        queryset = queryset.filter(
            action_id=action_id, asset_id=asset_id, sod_code=sod_code
        )
        return queryset


class SODRulesGet(generics.ListAPIView):
    serializer_class = SODRulesSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        queryset = SODRules.objects.all()
        sod_code = self.request.query_params.get("sodCode")
        queryset = queryset.filter(sod_code=sod_code)
        return queryset


class SODRulesCreate(generics.ListCreateAPIView):
    queryset = SODRules.objects.all()
    serializer_class = SODRulesSerializer
    permission_classes = (permissions.IsAuthenticated,)


class SODRulesUpdate(generics.RetrieveUpdateAPIView):
    queryset = SODRules.objects.all()
    serializer_class = SODRulesSerializer
    permission_classes = (permissions.IsAuthenticated,)


class SODRulesDelete(generics.DestroyAPIView):
    queryset = SODRules.objects.all()
    serializer_class = SODRulesSerializer
    permission_classes = (permissions.IsAuthenticated,)
