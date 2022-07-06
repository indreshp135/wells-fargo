import shutil
import os
from django.conf import settings
import requests
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from app.models import File, Folder, Notification
from django.contrib.auth.models import User
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from drf_yasg.openapi import Schema
from app.serializers.transfer import (
    TransferSerializer,
    TransferProceedSerializer,
    NotificationSerializer,
)
from app.permissions import TransferRequestPermissions


@swagger_auto_schema(
    method="POST",
    operation_id="file_transfer",
    operation_summary="File Transfer",
    operation_description="File Transfer",
    request_body=TransferSerializer,
    responses={
        status.HTTP_200_OK: Schema(
            type="object",
            properties={
                "message": {
                    "type": "string",
                    "description": "File Transfer Successful",
                },
            },
        ),
        status.HTTP_400_BAD_REQUEST: Schema(
            type="object",
            properties={
                "message": {"type": "string", "description": "File Transfer Failed"},
            },
        ),
        status.HTTP_401_UNAUTHORIZED: Schema(
            type="object",
            properties={
                "message": {"type": "string", "description": "Unauthorized"},
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
@permission_classes([permissions.IsAuthenticated, TransferRequestPermissions])
def FileTransferRequest(request):
    try:
        file_random_name = request.data["file_random_name"]
        destination_folder = request.data["destination_folder"]
        file = File.objects.get(file_random_name=file_random_name)

        if not Folder.objects.filter(folder_slug=destination_folder).exists():
            return Response(
                {"message": "Folder does not exist"}, status=status.HTTP_404_NOT_FOUND
            )

        if file.folder.folder_slug == destination_folder:
            return Response(
                {"message": "File already in the destination folder"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        manager_email = requests.get(
            os.environ.get("AUTHZ_SERVER_URL")
            + "/api/users/manager/?email={}".format(request.user.email)
        ).json()["manager"]

        if not manager_email:
            return Response(
                {"message": "Manager email not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        Notification.objects.create(
            requested_user=request.user,
            file=file,
            destination_folder=Folder.objects.get(folder_slug=destination_folder),
            notification_type=Notification.NotificationType.REQUEST_DIRECT_MANAGER,
            notification_user=User.objects.get(email=manager_email),
            notification_read=False,
        )
        return Response(
            {"message": "File Transfer Requested"}, status=status.HTTP_200_OK
        )

    except Exception as e:
        print(e)
        return Response(
            {"message": "File Transfer Failure"}, status=status.HTTP_400_BAD_REQUEST
        )


@swagger_auto_schema(
    method="POST",
    operation_id="file_transfer_proceed",
    operation_summary="File Transfer Proceed",
    operation_description="File Transfer Proceed",
    request_body=TransferProceedSerializer,
    responses={
        status.HTTP_200_OK: Schema(
            type="object",
            properties={
                "message": {"type": "string", "description": "File Transfer Proceeded"},
            },
        ),
        status.HTTP_400_BAD_REQUEST: Schema(
            type="object",
            properties={
                "message": {
                    "type": "string",
                    "description": "File Transfer Requests Failure",
                },
            },
        ),
        status.HTTP_401_UNAUTHORIZED: Schema(
            type="object",
            properties={
                "message": {"type": "string", "description": "Unauthorized"},
            },
        ),
        status.HTTP_404_NOT_FOUND: Schema(
            type="object",
            properties={
                "message": {"type": "string", "description": "File Transfer Denied"},
            },
        ),
    },
)
@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def FileTransferProceed(request):
    try:
        notification_id = request.data["notification_id"]
        transfer_accepted = request.data["transfer_accepted"]
        notification = Notification.objects.get(pk=notification_id)
        if notification.notification_user != request.user:
            return Response(
                {"message": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED
            )
        if (
            notification.notification_type
            != Notification.NotificationType.REQUEST_DIRECT_MANAGER
        ):
            return Response(
                {"message": "Notification is not a file transfer request"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if transfer_accepted:

            file = notification.file
            destination_folder = notification.destination_folder

            res = requests.get(
                os.environ.get("AUTHZ_SERVER_URL")
                + "/api/users/manager/location/?location={}".format(
                    destination_folder.folder_slug.upper()
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
                requested_user=notification.requested_user,
                file=file,
                destination_folder=destination_folder,
                notification_type=Notification.NotificationType.REQUEST_LOCATION_MANAGER,
                notification_user=User.objects.get(email=manager_email),
                notification_read=False,
            )

            notification.notification_read = True
            notification.save()

            return Response(
                {"message": "File Transfer Proceeded"}, status=status.HTTP_200_OK
            )

        else:
            notification = Notification.objects.get(id=notification_id)
            notification.notification_read = True
            notification.save()
            return Response(
                {"message": "File Transfer Denied"}, status=status.HTTP_404_NOT_FOUND
            )

    except Exception as e:
        print(e)
        return Response(
            {"message": "File Transfer Requests Failure"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@swagger_auto_schema(
    method="POST",
    operation_id="file_transfer_permit",
    operation_summary="File Transfer Permit",
    operation_description="File Transfer Permit",
    request_body=TransferProceedSerializer,
    responses={
        status.HTTP_200_OK: Schema(
            type="object",
            properties={
                "message": {"type": "string", "description": "File Transfer Permitted"},
            },
        ),
        status.HTTP_400_BAD_REQUEST: Schema(
            type="object",
            properties={
                "message": {
                    "type": "string",
                    "description": "File Transfer Permit Failure",
                },
            },
        ),
        status.HTTP_401_UNAUTHORIZED: Schema(
            type="object",
            properties={
                "message": {"type": "string", "description": "Unauthorized"},
            },
        ),
        status.HTTP_404_NOT_FOUND: Schema(
            type="object",
            properties={
                "message": {"type": "string", "description": "File Transfer Denied"},
            },
        ),
    },
)
@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def FileTransferPermit(request):
    try:
        notification_id = request.data["notification_id"]
        transfer_accepted = request.data["transfer_accepted"]
        notification = Notification.objects.get(pk=notification_id)
        if notification.notification_user != request.user:
            return Response(
                {"message": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED
            )
        if (
            notification.notification_type
            != Notification.NotificationType.REQUEST_LOCATION_MANAGER
        ):
            return Response(
                {"message": "Notification is not a file transfer request"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if transfer_accepted:
            file = notification.file
            destination_folder = notification.destination_folder

            # get extension of the file
            _, extension = file.file_name.split(".")

            # change folder in uploads directory
            shutil.move(
                os.path.join(
                    settings.MEDIA_ROOT,
                    file.folder.folder_slug,
                    file.file_random_name + "." + extension,
                ),
                os.path.join(
                    settings.MEDIA_ROOT,
                    destination_folder.folder_slug,
                    file.file_random_name + "." + extension,
                ),
            )

            file.folder = destination_folder
            file.save()

            notification.notification_read = True
            notification.save()

            return Response(
                {"message": "File Transfer Permitted"}, status=status.HTTP_200_OK
            )

        else:
            notification = Notification.objects.get(id=notification_id)
            notification.notification_read = True
            notification.save()
            return Response(
                {"message": "File Transfer Denied"}, status=status.HTTP_404_NOT_FOUND
            )

    except Exception as e:
        print(e)
        return Response(
            {"message": "File Transfer Permit Failure"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@swagger_auto_schema(
    method="GET",
    operation_id="get_notifications",
    operation_summary="Get Notifications",
    operation_description="Get Notifications",
)
@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def GetNotifications(request):
    try:
        notifications = Notification.objects.filter(
            notification_user=request.user, notification_read=False
        )
        for notification in notifications:
            if (
                notification.notification_type
                == Notification.NotificationType.REQUEST_DIRECT_MANAGER
            ):
                notification.notification_message = (
                    "You have a file transfer request from "
                    + notification.requested_user.username
                    + " to transfer file "
                    + notification.file.file_name
                    + " to "
                    + notification.destination_folder.folder_name
                )
            elif (
                notification.notification_type
                == Notification.NotificationType.REQUEST_LOCATION_MANAGER
            ):
                notification.notification_message = (
                    "You have a file transfer request from "
                    + notification.requested_user.username
                    + " the manager of "
                    + notification.file.folder.folder_name
                    + " to transfer file "
                    + notification.file.file_name
                    + " to your folder."
                )
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response(
            {"message": "Get Notifications Failure"}, status=status.HTTP_400_BAD_REQUEST
        )
