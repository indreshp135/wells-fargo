from django.test import TestCase
from rest_framework.test import force_authenticate, APIRequestFactory
from app.views.Action import ActionList
from django.contrib.auth.models import User


class ActionsTest(TestCase):

    fixtures = [
        "app/fixtures/users.json",
        "app/fixtures/actions.json",
    ]

    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.get(username="test")

    def test_get_Actions(self):
        request = self.factory.get("/api/actions/")
        force_authenticate(request, user=self.user)
        response = ActionList.as_view()(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_post_Actions(self):
        request = self.factory.post("/api/actions/", {"action_name": "UPDATE"})
        force_authenticate(request, user=self.user)
        response = ActionList.as_view()(request)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["action_name"], "UPDATE")

    def test_get_without_authentication(self):
        request = self.factory.get("/api/actions/")
        response = ActionList.as_view()(request)
        self.assertEqual(response.status_code, 401)

    def test_post_without_authentication(self):
        request = self.factory.post("/api/actions/", {"action_name": "UPDATE"})
        response = ActionList.as_view()(request)
        self.assertEqual(response.status_code, 401)
