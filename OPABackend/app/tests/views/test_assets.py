from django.test import TestCase
from rest_framework.test import force_authenticate, APIRequestFactory
from app.views.Asset import AssetList, AssetCreate
from django.contrib.auth.models import User
from app.models import Application


class AssetsTest(TestCase):

    fixtures = [
        "app/fixtures/users.json",
        "app/fixtures/assets.json",
        "app/fixtures/applications.json",
    ]

    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.get(username="test")
        self.application = Application.objects.get(application_id=1)
        self.get_url = "/api/asset/" + str(self.application.application_id) + "/"
        self.post_url = "/api/asset/"

    def test_get_assets(self):
        request = self.factory.get(self.get_url)
        force_authenticate(request, user=self.user)
        response = AssetList.as_view()(
            request, application_hash=self.application.application_hash
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_post_assets(self):
        request = self.factory.post(
            self.post_url,
            {
                "asset_name": "Delhi",
                "application_hash": self.application.application_hash,
            },
        )
        force_authenticate(request, user=self.user)
        response = AssetCreate.as_view()(request)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["asset_name"], "Delhi")

    def test_get_without_authentication(self):
        request = self.factory.get("/api/asset/")
        response = AssetList.as_view()(request)
        self.assertEqual(response.status_code, 401)

    def test_post_without_authentication(self):
        request = self.factory.post(
            self.post_url,
            {
                "asset_name": "Delhi",
                "application_hash": self.application.application_hash,
            },
        )
        response = AssetCreate.as_view()(request)
        self.assertEqual(response.status_code, 401)
