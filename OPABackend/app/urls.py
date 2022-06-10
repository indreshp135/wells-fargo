from django.urls import path
from app.views.gauth import GoogleLogin
from app.views.SOD import SODList
from app.views.Asset import AssetList
from app.views.Action import ActionList

app_name = "api"

urlpatterns = [
    path("auth/google/", GoogleLogin.as_view(), name="google_login"),
    path("SOD/", SODList.as_view(), name="SOD_list"),
    path("action/", ActionList.as_view(), name="action_list"),
    path("asset/", AssetList.as_view(), name="asset_list"),
]
