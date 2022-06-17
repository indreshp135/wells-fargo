from django.urls import path
from app.views.gauth import GoogleLogin

from app.views.files import UploadView, FileDeleteView, FileListView
from app.views.folders import FolderList

app_name = "api"


urlpatterns = [
    path("auth/google/", GoogleLogin.as_view(), name="google_login"),
    path("folder/", FolderList.as_view(), name="folder_view"),
    path("file/", UploadView.as_view(), name="file_view"),
    path(
        "file/<str:file_random_name>/",
        FileDeleteView.as_view(),
        name="file_delete_view",
    ),
    path("folder/<str:folder>/", FileListView.as_view(), name="file_list_view"),
]
