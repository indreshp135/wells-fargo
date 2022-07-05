from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status


@swagger_auto_schema(
    method="GET",
    operation_id="get_authorizations",
    operation_summary="Get List of Authorized Action Asset Pairs",
    operation_description="Get List of Authorized Action Asset Pairs",
)
@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def GetAuthorizations(request):
    print(request.user)
    try:
        return Response({"allowed": request.authorizations}, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response(
            {"message": "Failed to Get Authorizations"},
            status=status.HTTP_400_BAD_REQUEST,
        )
