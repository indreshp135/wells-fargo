from rest_framework import permissions
from app.models import File


class FileUploadPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        folder = request.data["folder_slug"].upper()
        if (
            (folder in request.authorizations)
            and ("WRITE" in request.authorizations[folder])
            and request.authorizations[folder]["WRITE"] == "PERMISSION_GRANTED"
        ):
            return True
        return False


class FileDeletePermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        file_random_name = view.kwargs.get("file_random_name")
        if not File.objects.filter(file_random_name=file_random_name).exists():
            return False
        folder = File.objects.get(file_random_name=file_random_name).folder.folder_name
        folder = folder.upper()
        if (
            (folder in request.authorizations)
            and ("DELETE" in request.authorizations[folder])
            and (request.authorizations[folder]["DELETE"] == "PERMISSION_GRANTED")
        ):
            return True
        return False


class FileReadPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        folder = view.kwargs.get("folder")
        folder = folder.upper()
        if (
            (folder in request.authorizations)
            and ("READ" in request.authorizations[folder])
            and request.authorizations[folder]["READ"] == "PERMISSION_GRANTED"
        ):
            return True
        return False
