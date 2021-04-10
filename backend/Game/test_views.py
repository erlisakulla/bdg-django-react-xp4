from django.test import TestCase
from .models import game
from User.models import User

from rest_framework.test import APITestCase


class GameActionsTest(APITestCase):
    game_url = "/game/"
    user_url = "/user/create/"
    login_url = "/api/token/"

    def setUp(self):
        User.objects.create(
            email="user2@gmail.com",
            name="name",
            password="whatever111",
            is_instructor=True,
        )

    """
        create and retrieve games without authentication
    """

    def test_without_authorization(self):
        response_post = self.client.post(
            self.game_url,
            {
                "session_length": 1,
                "is_wholesalor_present": True,
                "in_distributor_present": True,
                "instructor": User.objects.get(name="name"),
            },
        )
        self.assertEqual(401, response_post.status_code)

        response_get = self.client.get(self.game_url)
        self.assertEqual(401, response_get.status_code)

    """
        create and retrieve games with authentication
    """

    def test_authorization(self):
        pass


class DemandActionTest(APITestCase):
    url = "/game/demand"

    def setUp(self):
        User.objects.create(
            email="user2@gmail.com",
            name="name",
            password="whatever111",
            is_instructor=True,
        )

    def test_without_authorization(self):
        response_post = self.client.post(
            self.url,
            {
                "demand_id": "1234",
                "weeks_num": 5,
                "demands": "1 2 3 4 5",
                "instructor": User.objects.get(name="name"),
            },
        )
        self.assertEqual(401, response_post.status_code)

        response_get = self.client.get(self.url)
        self.assertEqual(401, response_get.status_code)
