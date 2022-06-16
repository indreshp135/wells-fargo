from rest_framework import generics, permissions
from app.serializers.ActionSerializers import ActionSerializer, ActionListSerializer
from app.models import Action


class ActionList(generics.ListAPIView):
    serializer_class = ActionListSerializer
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = "application_hash"

    def get_queryset(self):
        return Action.objects.filter(
            application_id__application_hash=self.kwargs["application_hash"]
        )


class ActionCreate(generics.CreateAPIView):
    serializer_class = ActionSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Action.objects.all()
