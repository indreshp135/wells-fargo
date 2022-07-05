import os
import requests
import json
from rest_framework.decorators import permission_classes
from rest_framework import permissions
from re import sub
from rest_framework.authtoken.models import Token


class GetAuthorization:
    def __init__(self, get_response):
        self.url = os.environ.get("PBE_URL")
        self.app_hash = os.environ.get("APP_HASH")
        self.get_response = get_response
        print(self.app_hash)

    @permission_classes([permissions.IsAuthenticated])
    def __call__(self, request):
        header_token = request.META.get("HTTP_AUTHORIZATION", None)
        if header_token is not None:
            try:
                token = sub("Token ", "", request.META.get("HTTP_AUTHORIZATION", None))
                token_obj = Token.objects.get(key=token)
                request.user = token_obj.user
            except Token.DoesNotExist:
                pass
        print(request.user.is_authenticated)
        if request.user.is_authenticated:
            userDetails = {
                "user_email": request.user.email,
                "app_hash": self.app_hash,
            }
            pbe_server_response = requests.post(
                self.url + "/api/authorize/", data=userDetails
            )
            if pbe_server_response.status_code == 200:
                request.authorizations = json.loads(pbe_server_response.text)
            else:
                request.authorizations = []
        print("middleware")
        response = self.get_response(request)

        return response
