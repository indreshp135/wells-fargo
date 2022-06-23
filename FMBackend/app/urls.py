from django.urls import path
from app.views.gauth import GoogleLogin
from app.views.authorizations import GetAuthorizations

app_name = "api"

urlpatterns = [
    path("auth/google/", GoogleLogin.as_view(), name="google_login"),
    path("authorizations/", GetAuthorizations, name="authorizations_view"),
]
