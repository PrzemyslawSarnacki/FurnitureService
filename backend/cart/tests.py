import json
from api.models import CATEGORY_CHOICES, Item, LABEL_CHOICES
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APIClient, APITestCase, force_authenticate


class CartAPITestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.order_url = "/api/order-summary/"
        self.cart_url = "/api/add-to-cart/"
        self.username = "hehe"
        self.email = "hehe@snow.com"
        self.password = "you_dunno_tha_ting"
        self.user = User.objects.create_user(self.username, self.email, self.password)

        response = self.client.login(username=self.username, password=self.password)
        self.client.force_authenticate(user=self.user, token=self.user.auth_token)

        Item.objects.create(
            title="Hehe",
            price=100,
            category=CATEGORY_CHOICES[0][0],
            label=LABEL_CHOICES[0][0],
            slug="1",
            description="Description of our super product",
            image="",
        )

    def test_add_to_cart(self):
        data = {"slug": "1"}

        response = self.client.post(self.cart_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_payments(self):
        response = self.client.get(path="/api/payments/", format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_order_summary_without_active_order(self):
        response = self.client.get(path="/api/order-summary/", format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
