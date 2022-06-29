from django.test import TestCase
from rest_framework.test import force_authenticate, APIRequestFactory
from app.views.Exceptions import (
    ExceptionsList,
    ExceptionsCreate,
    ExceptionsDeleteRetrive,
)
from django.contrib.auth.models import User
from app.models import Application, ExceptionRules


class ApplicationsTest(TestCase):

    fixtures = [
        "app/fixtures/users.json",
        "app/fixtures/customUsers.json",
        "app/fixtures/applications.json",
        "app/fixtures/assets.json",
        "app/fixtures/actions.json",
        "app/fixtures/users.json",
        "app/fixtures/exceptions.json",
    ]

    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.get(username="test")
        self.application_hash = Application.objects.get(pk=1).application_hash
        self.get_exceptions_url = "api/exceptions/" + self.application_hash + "/"
        self.post_exceptions_url = "api/exceptions/"
        self.change_exceptions_url = "api/exceptions/2/change"

    def test_get_exceptions(self):
        request = self.factory.get(self.get_exceptions_url)
        force_authenticate(request, user=self.user)
        response = ExceptionsList.as_view()(
            request, application_hash=self.application_hash
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_post_exceptions(self):
        data = {
            "exception_rule_name": "test",
            "exception_rule_description": "test",
            "asset_id": 1,
            "action_id": 1,
            "application_id": 1,
            "application_hash": self.application_hash,
            "exception_for_email": "test@gmail.com",
            "exception_grand_type": "PG",
        }
        request = self.factory.post(self.post_exceptions_url, data)
        force_authenticate(request, user=self.user)
        response = ExceptionsCreate.as_view()(request)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(ExceptionRules.objects.count(), 3)

    def test_post_exceptions_without_asset(self):
        data = {
            "exception_rule_name": "test",
            "exception_rule_description": "test",
            "action_id": 1,
            "application_id": 1,
            "application_hash": self.application_hash,
            "exception_for_email": "test@gmail.com",
            "exception_grand_type": "PG",
        }
        request = self.factory.post(self.post_exceptions_url, data)
        force_authenticate(request, user=self.user)
        response = ExceptionsCreate.as_view()(request)
        self.assertEqual(response.status_code, 400)

    def test_post_exceptions_with_wrong_asset(self):
        data = {
            "exception_rule_name": "test",
            "exception_rule_description": "test",
            "asset_id": 3,
            "action_id": 1,
            "application_id": 1,
            "application_hash": self.application_hash,
            "exception_for_email": "test@gmail.com",
            "exception_grand_type": "PG",
        }
        request = self.factory.post(self.post_exceptions_url, data)
        force_authenticate(request, user=self.user)
        response = ExceptionsCreate.as_view()(request)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.data["non_field_errors"][0],
            "Asset does not belong to this application",
        )

    def test_post_exceptions_without_action(self):
        data = {
            "exception_rule_name": "test",
            "exception_rule_description": "test",
            "asset_id": 1,
            "application_id": 1,
            "application_hash": self.application_hash,
            "exception_for_email": "test@gmail.com",
            "exception_grand_type": "PG",
        }
        request = self.factory.post(self.post_exceptions_url, data)
        force_authenticate(request, user=self.user)
        response = ExceptionsCreate.as_view()(request)
        self.assertEqual(response.status_code, 400)

    def test_post_exceptions_with_wrong_action(self):
        data = {
            "exception_rule_name": "test",
            "exception_rule_description": "test",
            "asset_id": 1,
            "action_id": 3,
            "application_id": 1,
            "application_hash": self.application_hash,
            "exception_for_email": "test@gmail.com",
            "exception_grand_type": "PG",
        }
        request = self.factory.post(self.post_exceptions_url, data)
        force_authenticate(request, user=self.user)
        response = ExceptionsCreate.as_view()(request)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.data["non_field_errors"][0],
            "Action does not belong to this application",
        )

    def test_retrieve_exception(self):
        request = self.factory.get(self.get_exceptions_url)
        force_authenticate(request, user=self.user)
        response = ExceptionsDeleteRetrive.as_view()(request, exception_rule_id=2)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["exception_rule_name"], "Exception Rule 2")

    def test_update_exception(self):
        data = {
            "exception_rule_name": "test",
            "exception_rule_description": "test",
            "asset_id": 1,
            "action_id": 1,
            "application_id": 1,
            "application_hash": self.application_hash,
            "exception_for_email": "test@gmail.com",
            "exception_grand_type": "PG",
        }
        request = self.factory.put(self.change_exceptions_url, data)
        force_authenticate(request, user=self.user)
        response = ExceptionsDeleteRetrive.as_view()(request, exception_rule_id=2)
        self.assertEqual(response.status_code, 200)
        request = self.factory.get(self.get_exceptions_url)
        force_authenticate(request, user=self.user)
        response = ExceptionsDeleteRetrive.as_view()(request, exception_rule_id=2)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["exception_rule_name"], "test")

    def test_update_exception_with_wrong_action(self):
        data = {
            "exception_rule_name": "test",
            "exception_rule_description": "test",
            "asset_id": 1,
            "action_id": 3,
            "application_id": 1,
            "application_hash": self.application_hash,
            "exception_for_email": "test@gmail.com",
            "exception_grand_type": "PG",
        }
        request = self.factory.put(self.change_exceptions_url, data)
        force_authenticate(request, user=self.user)
        response = ExceptionsDeleteRetrive.as_view()(request, exception_rule_id=2)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.data["non_field_errors"][0],
            "Action does not belong to this application",
        )

    def test_update_exception_with_wrong_asset(self):
        data = {
            "exception_rule_name": "test",
            "exception_rule_description": "test",
            "asset_id": 3,
            "action_id": 1,
            "application_id": 1,
            "application_hash": self.application_hash,
            "exception_for_email": "test@gmail.com",
            "exception_grand_type": "PG",
        }
        request = self.factory.put(self.change_exceptions_url, data)
        force_authenticate(request, user=self.user)
        response = ExceptionsDeleteRetrive.as_view()(request, exception_rule_id=2)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.data["non_field_errors"][0],
            "Asset does not belong to this application",
        )

    def test_delete_exception_with_wrong_id(self):
        request = self.factory.delete(self.get_exceptions_url)
        force_authenticate(request, user=self.user)
        response = ExceptionsDeleteRetrive.as_view()(request, exception_rule_id=3)
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.data["detail"], "Not found.")

    def test_delete_exception(self):
        request = self.factory.delete(self.change_exceptions_url)
        force_authenticate(request, user=self.user)
        response = ExceptionsDeleteRetrive.as_view()(request, exception_rule_id=2)
        self.assertEqual(response.status_code, 204)
