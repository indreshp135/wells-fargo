from django.urls import path
from app.views.gauth import GoogleLogin

app_name = "api"

urlpatterns = [
    path("auth/google/", GoogleLogin.as_view(), name="google_login"),
]
