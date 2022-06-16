from rest_framework import generics, permissions
from app.serializers.ExceptionsSerializers import ExceptionsSerializer
from app.models import ExceptionRules


class ExceptionsList(generics.ListAPIView):
    serializer_class = ExceptionsSerializer
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = "application_hash"

    def get_queryset(self):
        return ExceptionRules.objects.filter(
            application_id__application_hash=self.kwargs["application_hash"]
        )


class ExceptionsCreate(generics.CreateAPIView):
    queryset = ExceptionRules.objects.all()
    serializer_class = ExceptionsSerializer
    permission_classes = (permissions.IsAuthenticated,)


class ExceptionsDeleteRetrive(generics.RetrieveUpdateDestroyAPIView):
    queryset = ExceptionRules.objects.all()
    serializer_class = ExceptionsSerializer
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = "exception_rule_id"
