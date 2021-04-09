from django.test import TestCase
from .models import game
from User.models import User

from rest_framework.test import APITestCase


class UserRegistrationAPIViewTestCase(APITestCase):
    url = "/game/"

    def test_without_authorization(self):
        """
        Without authorization
        """

        cuser = User.objects.create(
            email="yahoo@gmail.com",
            name="ok",
            password="whatever111",
            is_instructor=True,
        )
        data = {
            "session_length": 1,
            "is_wholesalor_present": True,
            "in_distributor_present": True,
            "instructor": cuser,
        }
        response = self.client.post(self.url, data)
        self.assertEqual(401, response.status_code)
