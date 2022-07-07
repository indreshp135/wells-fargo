from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
import os
import requests


@swagger_auto_schema(
    method="GET",
    operation_id="get_authorizations",
    operation_summary="Get List of Authorized Action Asset Pairs",
    operation_description="Get List of Authorized Action Asset Pairs",
)
@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def GetAuthorizations(request):
    try:
        return Response({"allowed": request.authorizations}, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response(
            {"message": "Failed to Get Authorizations"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def GetUserDet(request):
    userDetails = {
        "user_email": request.user.email,
    }
    app_hash = os.environ.get("APP_HASH") + "/"
    url = os.environ.get("PBE_URL")
    resp = requests.get(url + "/api/sodUser/get/" + app_hash, data=userDetails)
    return Response({"data": resp})
