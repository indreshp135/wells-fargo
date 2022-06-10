from rest_framework import generics, permissions
from app.serializers.ActionSerializers import ActionSerializer
from app.models import Action


class ActionList(generics.ListCreateAPIView):
    queryset = Action.objects.all()
    serializer_class = ActionSerializer
    permission_classes = (permissions.IsAuthenticated,)
