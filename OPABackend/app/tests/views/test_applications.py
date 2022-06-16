from django.test import TestCase
from rest_framework.test import force_authenticate, APIRequestFactory
from app.views.Application import ApplicationList
from django.contrib.auth.models import User


class ApplicationsTest(TestCase):

    fixtures = [
        "app/fixtures/users.json",
        "app/fixtures/applications.json",
    ]

    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.get(username="test")

    def test_get_applications(self):
        request = self.factory.get("/api/application/")
        force_authenticate(request, user=self.user)
        response = ApplicationList.as_view()(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_post_applications(self):
        request = self.factory.post(
            "/api/application/",
            {
                "application_name": "File Management",
                "application_description": "File Management",
            },
        )
        force_authenticate(request, user=self.user)
        response = ApplicationList.as_view()(request)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["application_name"], "File Management")

    def test_get_without_authentication(self):
        request = self.factory.get("/api/application/")
        response = ApplicationList.as_view()(request)
        self.assertEqual(response.status_code, 401)

    def test_post_without_authentication(self):
        request = self.factory.post(
            "/api/application/",
            {
                "application_name": "File Management",
                "application_description": "File Management",
            },
        )
        response = ApplicationList.as_view()(request)
        self.assertEqual(response.status_code, 401)
