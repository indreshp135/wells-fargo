from rest_framework import generics, permissions
from app.serializers.UsersSerializers import UserSerializer
from django.contrib.auth.models import User


class UserList(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = User.objects.all()
