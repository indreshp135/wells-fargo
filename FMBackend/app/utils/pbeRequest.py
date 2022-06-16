from typing import Dict
import requests
import json


# url of pbe server
url = "localhost:8000"


class PBERequest:

    # static method to get a dictionary containing a list of allowed actions on various assets
    @staticmethod
    def authorization(userDetails):
        response = requests.post(url + "/api/authorize/", data=userDetails)
        if response.status_code == 200:
            return json.loads(response.json())
        else:
            return {}

    # static method to update permission settings for a particular employee
    @staticmethod
    def permission(userDetails):
        response = requests.post(url + "/api/permissions/", data=userDetails)
        return response.status_code == 200
