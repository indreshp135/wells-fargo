import os
import requests
import json
from rest_framework.decorators import permission_classes
from rest_framework import permissions


class GetAuthorization:
    def __init__(self, get_response):
        self.url = os.environ.get("AUTHZ_SERVER_URL")
        self.get_response = get_response

    @permission_classes([permissions.IsAuthenticated])
    def __call__(self, request):
        if request.user.is_authenticated:
            userDetails = {"user_email": request.user.email}
            pbe_server_response = requests.post(
                self.url + "/api/authorize/", data=userDetails
            )
            if pbe_server_response.status_code == 200:
                request.user.authorizations = json.loads(pbe_server_response.text)
            else:
                request.user.authorizations = []

        response = self.get_response(request)
        print(response.status_code)
        return response
