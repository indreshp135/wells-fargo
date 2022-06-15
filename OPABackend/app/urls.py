from django.urls import path
from app.views.gauth import GoogleLogin
from app.views.SOD import SODList
from app.views.SOD import SODDelete
from app.views.Asset import AssetList
from app.views.Action import ActionList
from app.views.SODRules import SODRulesList
from app.views.SODRules import SODRulesCreate
from app.views.SODRules import SODRulesDelete
from app.views.SODRules import SODRulesGet
from app.views.Application import ApplicationList

app_name = "api"

urlpatterns = [
    path("auth/google/", GoogleLogin.as_view(), name="google_login"),
    path("SOD/", SODList.as_view(), name="SOD_list"),
    path("SOD/<int:pk>/delete", SODDelete.as_view(), name="SOD_Delete"),
    path("action/", ActionList.as_view(), name="action_list"),
    path("asset/", AssetList.as_view(), name="asset_list"),
    path("SODRules/", SODRulesList.as_view(), name="SODRules_list"),
    path("SODRules/sod/", SODRulesGet.as_view(), name="SODRules_list"),
    path("SODRules/create", SODRulesCreate.as_view(), name="SODRules_Create"),
    path("SODRules/<int:pk>/delete", SODRulesDelete.as_view(), name="SODRules_Delete"),
    path("application/", ApplicationList.as_view(), name="application_list"),
]
