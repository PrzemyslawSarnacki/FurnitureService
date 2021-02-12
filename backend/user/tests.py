import json
from django.contrib.auth.models import User
from django.urls import include, path
from rest_framework.test import APIClient, APITestCase, URLPatternsTestCase


class UserRegistrationAPITestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()

    def test_registration(self):
        registration_data = {
            "username": "user1",
            "email": "mail@gmail.com",
            "password1": "Passwrd13",
            "password2": "Passwrd13",
        }

        response = self.client.post(
            path="/rest-auth/registration/", data=registration_data, format="json"
        )
        self.assertEqual(201, response.status_code)
        self.assertTrue("key" in json.loads(response.content))


class UserLoginAPIViewTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.username = "hehe"
        self.email = "hehe@snow.com"
        self.password = "you_dunno_tha_ting"
        self.user = User.objects.create_user(self.username, self.email, self.password)

    def test_authentication_without_password(self):
        response = self.client.post(
            path="/rest-auth/login/",
            data={
                "username": self.username,
            },
            format="json",
        )
        self.assertEqual(400, response.status_code)

    def test_authentication_with_wrong_password(self):
        response = self.client.post(
            path="/rest-auth/login/",
            data={"username": self.username, "password": "wrong_password"},
            format="json",
        )
        self.assertEqual(400, response.status_code)

    def test_authentication_with_valid_data(self):
        response = self.client.post(
            path="/rest-auth/login/",
            data={"username": self.username, "password": self.password},
            format="json",
        )
        self.assertEqual(200, response.status_code)
        self.assertTrue("key" in json.loads(response.content))
