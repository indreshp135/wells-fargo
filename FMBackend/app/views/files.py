from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from app.serializers.files import (
    FileSerializer,
    FileList,
    FileSerializerPermission,
    UploadOrDeleteProceedSerializer,
)
from rest_framework.parsers import MultiPartParser, FormParser
from app.permissions import (
    FileDeletePermissions,
    FileReadPermissions,
    FileUploadPermissions,
    FileDeleteApprovalPermissions,
    FileUploadApprovalPermissions,
)
from app.models import File, Notification
from django.contrib.auth.models import User
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from drf_yasg import openapi
import requests
import os


class UploadView(generics.CreateAPIView):
    parser_classes = (
        MultiPartParser,
        FormParser,
    )
    permission_classes = [permissions.IsAuthenticated, FileUploadPermissions]
    queryset = File.objects.all()
    serializer_class = FileSerializer


class PermissionUploadView(generics.CreateAPIView):
    parser_classes = (
        MultiPartParser,
        FormParser,
    )
    permission_classes = [permissions.IsAuthenticated]
    queryset = File.objects.all()
    serializer_class = FileSerializerPermission


class FileDeleteView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, FileDeletePermissions]
    queryset = File.objects.all()
    serializer_class = FileSerializer
    lookup_field = "file_random_name"


@swagger_auto_schema(
    method="DELETE",
    operation_summary="Delete a file",
    operation_description="Delete a file",
    manual_parameters=[
        openapi.Parameter(
            name="file_random_name",
            in_=openapi.IN_PATH,
            type=openapi.TYPE_STRING,
            description="File random name",
        ),
    ],
    request_body=FileSerializer,
    responses={
        status.HTTP_200_OK: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "message": openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description="File deleted",
                ),
            },
        ),
        status.HTTP_400_BAD_REQUEST: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "message": openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description="File not found",
                ),
            },
        ),
    },
)
@permission_classes([permissions.IsAuthenticated])
@api_view(["DELETE"])
def delete_file_permission(request, file_random_name):
    try:
        file = File.objects.get(file_random_name=file_random_name)
        folder = file.folder

        res = requests.get(
            os.environ.get("PBE_URL")
            + "/api/users/manager/location/?location={}".format(
                folder.folder_slug.upper()
            )
        ).json()

        if "manager" not in res:
            return Response(
                {"message": "Manager email not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        else:
            manager_email = res["manager"]

        Notification.objects.create(
            requested_user=request.user,
            file=file,
            destination_folder=folder,
            notification_type=Notification.NotificationType.DELETE_REQUEST_LOCATION_MANAGER,
            notification_user=User.objects.get(email=manager_email),
            notification_read=False,
        )

        return Response({"message": "Requested to delete"}, status=status.HTTP_200_OK)
    except File.DoesNotExist:
        return Response(
            {"message": "File does not exist"}, status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class FileListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, FileReadPermissions]

    serializer_class = FileList
    lookup_field = "folder"

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def get_queryset(self):
        folder = self.kwargs["folder"]
        return File.objects.filter(folder__folder_slug=folder, display=True)


@swagger_auto_schema(
    method="POST",
    operation_id="file_permit",
    operation_summary="File Permit",
    operation_description="File Permit",
    request_body=UploadOrDeleteProceedSerializer,
    responses={
        status.HTTP_200_OK: openapi.Schema(
            type="object",
            properties={
                "message": {"type": "string", "description": "File Action Permitted"},
            },
        ),
        status.HTTP_400_BAD_REQUEST: openapi.Schema(
            type="object",
            properties={
                "message": {
                    "type": "string",
                    "description": "File Action Permit Failure",
                },
            },
        ),
        status.HTTP_401_UNAUTHORIZED: openapi.Schema(
            type="object",
            properties={
                "message": {"type": "string", "description": "Unauthorized"},
            },
        ),
        status.HTTP_404_NOT_FOUND: openapi.Schema(
            type="object",
            properties={
                "message": {"type": "string", "description": "File Transfer Denied"},
            },
        ),
    },
)
@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated, FileUploadApprovalPermissions])
def FileActionPermit(request):
    try:
        notification_id = request.data["notification_id"]
        action_accepted = request.data["action_accepted"]
        notification = Notification.objects.get(pk=notification_id)
        if notification.notification_user != request.user:
            return Response(
                {"message": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED
            )
        if (
            notification.notification_type
            == Notification.NotificationType.WRITE_REQUEST_LOCATION_MANAGER
        ):

            if action_accepted:
                file = notification.file
                file.display = True
                file.save()

                notification.notification_read = True
                notification.save()

                return Response(
                    {"message": "File Write Permitted"}, status=status.HTTP_200_OK
                )

            else:
                notification = Notification.objects.get(id=notification_id)
                notification.notification_read = True
                notification.save()
                return Response(
                    {"message": "File Write Denied"}, status=status.HTTP_404_NOT_FOUND
                )
    except Exception as e:
        print(e)
        return Response(
            {"message": "File Permit Failure"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@swagger_auto_schema(
    method="POST",
    operation_id="file_permit",
    operation_summary="File Permit",
    operation_description="File Permit",
    request_body=UploadOrDeleteProceedSerializer,
    responses={
        status.HTTP_200_OK: openapi.Schema(
            type="object",
            properties={
                "message": {"type": "string", "description": "File Action Permitted"},
            },
        ),
        status.HTTP_400_BAD_REQUEST: openapi.Schema(
            type="object",
            properties={
                "message": {
                    "type": "string",
                    "description": "File Action Permit Failure",
                },
            },
        ),
        status.HTTP_401_UNAUTHORIZED: openapi.Schema(
            type="object",
            properties={
                "message": {"type": "string", "description": "Unauthorized"},
            },
        ),
        status.HTTP_404_NOT_FOUND: openapi.Schema(
            type="object",
            properties={
                "message": {"type": "string", "description": "File Delete Denied"},
            },
        ),
    },
)
@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated, FileDeleteApprovalPermissions])
def FileDeletePermit(request):
    try:
        notification_id = request.data["notification_id"]
        action_accepted = request.data["action_accepted"]
        notification = Notification.objects.get(pk=notification_id)
        if notification.notification_user != request.user:
            return Response(
                {"message": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED
            )
        if (
            notification.notification_type
            == Notification.NotificationType.DELETE_REQUEST_LOCATION_MANAGER
        ):

            if action_accepted:
                file = notification.file
                file.delete()

                notification.notification_read = True
                notification.delete()

                return Response(
                    {"message": "File Delete Permitted"}, status=status.HTTP_200_OK
                )

            else:
                notification = Notification.objects.get(id=notification_id)
                notification.notification_read = True
                notification.delete()
                return Response(
                    {"message": "File Delete Denied"}, status=status.HTTP_404_NOT_FOUND
                )

    except Exception as e:
        print(e)
        return Response(
            {"message": "File Delete Failure"},
            status=status.HTTP_400_BAD_REQUEST,
        )
