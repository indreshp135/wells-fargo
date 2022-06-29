from rest_framework import generics, permissions
from app.serializers.UsersSerializers import UserSerializer
from app.models import Users
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class UserList(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        queryset = Users.objects.all()
        if self.request.query_params.get("email"):
            queryset = queryset.filter(email=self.request.query_params.get("email"))
        return queryset

    @swagger_auto_schema(
        operation_id="get_user",
        manual_parameters=[
            openapi.Parameter(
                name="email",
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                description="Email of the user",
                required=False,
            ),
        ],
        responses={
            200: UserSerializer,
            404: "User not found",
        },
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
