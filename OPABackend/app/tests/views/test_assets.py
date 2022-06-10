from django.test import TestCase
from rest_framework.test import force_authenticate, APIRequestFactory
from app.views.Asset import AssetList
from django.contrib.auth.models import User


class AssetsTest(TestCase):

    fixtures = [
        "app/fixtures/users.json",
        "app/fixtures/assets.json",
    ]

    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.get(username="test")

    def test_get_assets(self):
        request = self.factory.get("/api/assets/")
        force_authenticate(request, user=self.user)
        response = AssetList.as_view()(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_post_assets(self):
        request = self.factory.post("/api/assets/", {"asset_name": "Delhi"})
        force_authenticate(request, user=self.user)
        response = AssetList.as_view()(request)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["asset_name"], "Delhi")

    def test_get_without_authentication(self):
        request = self.factory.get("/api/assets/")
        response = AssetList.as_view()(request)
        self.assertEqual(response.status_code, 401)

    def test_post_without_authentication(self):
        request = self.factory.post("/api/assets/", {"asset_name": "Delhi"})
        response = AssetList.as_view()(request)
        self.assertEqual(response.status_code, 401)
