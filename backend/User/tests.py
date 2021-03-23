from django.test import TestCase
from .models import User
import json

# Create your tests here.
from rest_framework.test import APIRequestFactory

from rest_framework.test import APITestCase

class UserTest(TestCase):
    """ Test module for Game model """

    def setUp(self):
        User.objects.create(
            email='yahoo@gmail.com', name="ok", password="whatever111")

    def test_user(self):
        userok = User.objects.get(name='ok')
        self.assertEqual(
            userok.email, "yahoo@gmail.com")
      

class UserRegistrationAPIViewTestCase(APITestCase):
    url = '/user/create/'

    def test_missing_password(self):
        """
        Test to verify that a post call with missing passwords
        """
        user_data = {
            "name": "testuser",
            "email": "test@testuser.com",
        }
        response = self.client.post(self.url, user_data)
        self.assertEqual(400, response.status_code)

    def test_user_registration(self):
        """
        Test to verify that a post call with user valid data
        """
        user_data = {
            "name": "someone",
            "email": "test@testuser.com",
            "password": "123123",
        }
        response = self.client.post(self.url, user_data)
        self.assertEqual(201, response.status_code)



    def test_unique_email_validation(self):
        """
        Test to verify that a post call with already exists name
        """
        user_data_1 = {
            "name": "testuser",
            "email": "test@testuser.com",
            "password": "123123",

        }
        response = self.client.post(self.url, user_data_1)
        self.assertEqual(201, response.status_code)

        user_data_2 = {
            "email": "test@testuser.com",
            "password": "randompassword",
            "name":"testuser2"
            }
        response = self.client.post(self.url, user_data_2)
        self.assertEqual(400, response.status_code)

class UserLoginAPIViewTestCase(APITestCase):
    url = '/api/token/'

    def setUp(self):
        self.name = "Name"
        self.email = "i@gmail11.com"
        self.password = "12345611"
        self.user = User.objects.create(name=self.name, email=self.email, password=self.password)

    def test_authentication_without_password(self):
        response = self.client.post(self.url, {"email": "john@snow.com"})
        self.assertEqual(400, response.status_code)

    def test_authentication_with_wrong_password(self):
        response = self.client.post(self.url, {"email": self.email , "password": "idontcare"})
        self.assertEqual(401, response.status_code)

