from django.test import TestCase
from rest_framework.test import force_authenticate, APIRequestFactory
from app.views.Action import ActionCreate, ActionList
from django.contrib.auth.models import User
from app.models import Application


class ActionsTest(TestCase):

    fixtures = [
        "app/fixtures/users.json",
        "app/fixtures/actions.json",
        "app/fixtures/applications.json",
    ]

    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.get(username="test")
        self.application = Application.objects.get(application_id=1)
        self.get_url = "/api/action/" + str(self.application.application_hash)
        self.post_url = "/api/action/"

    def test_get_actions(self):
        request = self.factory.get(self.get_url)
        force_authenticate(request, user=self.user)
        response = ActionList.as_view()(
            request, application_hash=self.application.application_hash
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_post_actions(self):
        request = self.factory.post(
            self.post_url,
            {
                "action_name": "UPDATE",
                "application_hash": self.application.application_hash,
            },
        )
        force_authenticate(request, user=self.user)
        response = ActionCreate.as_view()(request)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["action_name"], "UPDATE")

    def test_get_without_authentication(self):
        request = self.factory.get(self.get_url)
        response = ActionList.as_view()(request)
        self.assertEqual(response.status_code, 401)

    def test_post_without_authentication(self):
        request = self.factory.post(
            self.post_url,
            {
                "action_name": "UPDATE",
                "application_hash": self.application.application_hash,
            },
        )
        response = ActionCreate.as_view()(request)
        self.assertEqual(response.status_code, 401)
