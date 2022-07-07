from django.urls import path
from app.views.gauth import GoogleLogin
from app.views.authorizations import GetAuthorizations
from app.views.transfer import (
    FileTransferRequest,
    FileTransferProceed,
    FileTransferPermit,
    GetNotifications,
    FileTransferDirect,
)
from app.views.files import (
    UploadView,
    FileDeleteView,
    FileListView,
    PermissionUploadView,
    delete_file_permission,
    FileActionPermit,
    FileDeletePermit,
)
from app.views.folders import FolderList

app_name = "api"


urlpatterns = [
    path("auth/google/", GoogleLogin.as_view(), name="google_login"),
    path("authorizations/", GetAuthorizations, name="authorizations_view"),
    path("folder/", FolderList.as_view(), name="folder_view"),
    path("file/", UploadView.as_view(), name="file_view"),
    path(
        "file/delete/<str:file_random_name>/",
        FileDeleteView.as_view(),
        name="file_delete_view",
    ),
    path(
        "file/permission/delete/<str:file_random_name>/",
        delete_file_permission,
        name="file_permission_delete_view",
    ),
    path(
        "file/permission/", PermissionUploadView.as_view(), name="file_permission_view"
    ),
    path("file/action/", FileActionPermit, name="file_action_permit_view"),
    path("file/action/delete", FileDeletePermit, name="file_delete_permit_view"),
    path("folder/<str:folder>/", FileListView.as_view(), name="file_list_view"),
    path("transfer/file/request/", FileTransferRequest, name="file_transfer_view"),
    path(
        "transfer/file/proceed/", FileTransferProceed, name="file_transfer_proceed_view"
    ),
    path("transfer/file/permit/", FileTransferPermit, name="file_transfer_permit_view"),
    path("notifications/", GetNotifications, name="notifications_view"),
    path("transfer/file/direct/", FileTransferDirect, name="transfer_direct"),
]
