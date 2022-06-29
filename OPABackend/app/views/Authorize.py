from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import (
    Users,
    SOD,
    SodUser,
    SODRules,
    Action,
    Application,
    Asset,
    ExceptionRules,
)
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from drf_yasg.openapi import Schema
from app.serializers.AuthorizeSerializer import AuthorizeSerializer


@swagger_auto_schema(
    method="POST",
    operation_id="authorize",
    operation_summary="Retrieve Authorizations",
    operation_description="Retrieve Authorizations",
    request_body=AuthorizeSerializer,
    responses={
        status.HTTP_200_OK: Schema(
            type="object",
        ),
        status.HTTP_400_BAD_REQUEST: Schema(
            type="object",
            properties={
                "message": {
                    "type": "string",
                    "description": "Failed to retrieve authorizations",
                },
            },
        ),
        status.HTTP_404_NOT_FOUND: Schema(
            type="object",
            properties={
                "message": {"type": "string", "description": "Not Found"},
            },
        ),
    },
)
@api_view(["POST"])
def AuthorizeRequest(request):
    try:
        user_email = request.data["user_email"]
        app_hash = request.data["application"]

        if not Application.objects.filter(application_hash=app_hash).exists():
            return Response(
                {"message": "Application does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )
        app = Application.objects.get(application_hash=app_hash)

        if not Users.objects.filter(email=user_email).exists():
            return Response(
                {"message": "User does not exist"}, status=status.HTTP_404_NOT_FOUND
            )
        user = Users.objects.get(email=user_email)

        if not SodUser.objects.filter(user_id=user, application_id=app).exists():
            return Response(
                {"message": "User does not exist in Application"},
                status=status.HTTP_404_NOT_FOUND,
            )
        user_sod_code = SodUser.objects.get(
            user_id=user.user_id, application_id=app.application_id
        ).sod_code
        user_sod = SOD.objects.get(sod_code=user_sod_code.sod_code)

        assets = Asset.objects.filter(application_id=app.application_id)
        actions = Action.objects.filter(application_id=app.application_id)

        output = {}

        for asset in assets:
            output[asset.asset_name] = {}
            for action in actions:
                rules_list = SODRules.objects.filter(
                    sod_code=user_sod.sod_code,
                    asset_id=asset.asset_id,
                    action_id=action.action_id,
                )
                if rules_list.exists():
                    if not rules_list[0].sod_rule_approval_required:
                        output[asset.asset_name][
                            action.action_name
                        ] = "PERMISSION_GRANTED"
                    else:
                        output[asset.asset_name][
                            action.action_name
                        ] = "APPROVAL_REQUIRED"
                else:
                    output[asset.asset_name][action.action_name] = "PERMISSION_DENIED"

        for asset in assets:
            for action in actions:
                if ExceptionRules.objects.filter(
                    asset_id=asset.asset_id,
                    action_id=action.action_id,
                    exception_for=user.user_id,
                ).exists():
                    permission_type = ExceptionRules.objects.get(
                        asset_id=asset.asset_id,
                        action_id=action.action_id,
                        exception_for=user.user_id,
                    ).exception_grand_type
                    output[asset.asset_name][
                        action.action_name
                    ] = ExceptionRules.approval_types(permission_type).label

        return Response(output, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response(
            {"message": "Failed to retrieve authorizations"},
            status=status.HTTP_400_BAD_REQUEST,
        )
