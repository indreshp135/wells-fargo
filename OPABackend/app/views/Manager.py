from rest_framework.response import Response
from app.models import Users
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


@swagger_auto_schema(
    method="GET",
    operation_id="get_manager",
    manual_parameters=[
        openapi.Parameter(
            name="email",
            in_=openapi.IN_QUERY,
            type=openapi.TYPE_STRING,
            description="Email of the user",
            required=True,
        ),
    ],
    responses={
        200: "manager",
        404: "User not found",
    },
)
@api_view(["GET"])
def get_manager(request):
    """
    Get the manager of the application
    """
    try:
        manager = Users.objects.get(email=request.query_params.get("email")).manager
        if not manager:
            return Response({"message": "No manager found"}, status=404)
        return Response({"manager": manager.email})
    except Users.DoesNotExist:
        return Response({"error": "User not found"}, status=404)


@swagger_auto_schema(
    method="GET",
    operation_id="get_managers",
    manual_parameters=[
        openapi.Parameter(
            name="location",
            in_=openapi.IN_QUERY,
            type=openapi.TYPE_STRING,
            description="Location of the manager",
            required=True,
        ),
    ],
    responses={
        200: "managers",
        404: "No managers found",
    },
)
@api_view(["GET"])
def get_manager_from_location(request):
    try:
        location = request.query_params.get("location").upper()
        manager = Users.objects.filter(location=location, is_manager=True)
        if not manager:
            return Response({"message": "No manager found"}, status=404)
        return Response({"manager": manager[0].email})

    except Users.DoesNotExist:
        return Response({"error": "Manager not found"}, status=404)
