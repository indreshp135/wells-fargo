from django.urls import path
from app.views.gauth import GoogleLogin
from app.views.SOD import SODList
from app.views.SOD import SODDelete, SODCreate
from app.views.Asset import AssetList, AssetCreate
from app.views.Action import ActionList, ActionCreate
from app.views.SODRules import SODRulesList
from app.views.SODRules import SODRulesCreate
from app.views.SODRules import SODRulesDelete
from app.views.SODRules import SODRulesGet
from app.views.Application import ApplicationList
from app.views.Exceptions import (
    ExceptionsCreate,
    ExceptionsList,
    ExceptionsDeleteRetrive,
)
from app.views.Users import UserList
from app.views.SODUser import SODUserCreate
from app.views.Manager import get_manager, get_manager_from_location
from app.views.Authorize import AuthorizeRequest

app_name = "api"

urlpatterns = [
    path("auth/google/", GoogleLogin.as_view(), name="google_login"),
    path("SOD/", SODCreate.as_view(), name="sods"),
    path("SOD/<str:application_hash>/", SODList.as_view(), name="sod_list"),
    path("SOD/<int:pk>/delete", SODDelete.as_view(), name="SOD_Delete"),
    path("action/", ActionCreate.as_view(), name="action_list"),
    path("action/<str:application_hash>/", ActionList.as_view(), name="action_list"),
    path("asset/", AssetCreate.as_view(), name="asset_list"),
    path("asset/<str:application_hash>/", AssetList.as_view(), name="asset_list"),
    path("SODRules/", SODRulesList.as_view(), name="SODRules_list"),
    path("SODRules/sod/", SODRulesGet.as_view(), name="SODRules_list"),
    path("SODRules/create", SODRulesCreate.as_view(), name="SODRules_Create"),
    path("SODRules/<int:pk>/delete", SODRulesDelete.as_view(), name="SODRules_Delete"),
    path("application/", ApplicationList.as_view(), name="application_list"),
    path("authorize/", AuthorizeRequest, name="authorize"),
    path("exceptions/", ExceptionsCreate.as_view(), name="exceptions_list"),
    path(
        "exceptions/<str:application_hash>/",
        ExceptionsList.as_view(),
        name="exceptions_list",
    ),
    path(
        "exceptions/<int:exception_rule_id>/change",
        ExceptionsDeleteRetrive.as_view(),
        name="exceptions_delete",
    ),
    path("users/", UserList.as_view(), name="users_list"),
    path("sodUser/create/", SODUserCreate.as_view(), name="create_soduser"),
    path("users/manager/", get_manager, name="manager"),
    path("users/manager/location/", get_manager_from_location, name="manager"),
]
