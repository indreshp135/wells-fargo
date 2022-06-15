from rest_framework import generics, permissions
from app.serializers.ActionSerializers import ActionSerializer, ActionListSerializer
from app.models import Action


class ActionList(generics.ListCreateAPIView):
    queryset = Action.objects.all()
    serializer_class = ActionSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_serializer_class(self):
        if self.request.method == "GET":
            return ActionListSerializer
        elif self.request.method == "POST":
            return ActionSerializer
