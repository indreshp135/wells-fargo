from rest_framework import permissions, serializers, generics
from app.models import SodUser, Users, SOD
from app.serializers.SODUserSerializers import SodUserSerializer
from app.serializers.SODSerializers import SODSerializer
from rest_framework.response import Response


class SODUserCreate(generics.CreateAPIView):
    queryset = SodUser.objects.all()
    serializer_class = SodUserSerializer
    permission_classes = (permissions.IsAuthenticated,)


class GetSODUser(generics.ListAPIView):

    serializer_class = SODSerializer
    lookup_field = "application_hash"

    def get_queryset(self):
        user_email = self.request.data["user_email"]

        cur_user = Users.objects.filter(email=user_email)

        sodUser = SodUser.objects.filter(
            user_id=cur_user[0].user_id,
            application_id__application_hash=self.kwargs["application_hash"],
        )

        sod = SOD.objects.filter(sod_code=sodUser[0].sod_code.sod_code)

        return sod
