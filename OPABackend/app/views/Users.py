from rest_framework import generics, permissions
from app.serializers.UsersSerializers import UserSerializer, wfUserSerializer
from django.contrib.auth.models import User
from app.models import Users


class UserList(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = User.objects.all()


class UserExists(generics.ListAPIView):
    serializer_class = wfUserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        queryset = Users.objects.all()
        email = self.request.query_params.get("email")
        queryset = queryset.filter(email=email)
        return queryset
