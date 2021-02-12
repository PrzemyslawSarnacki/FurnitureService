import json
from django.urls import include, path
from rest_framework.test import APIClient, APITestCase, URLPatternsTestCase


class ItemViewTestCase(APITestCase, URLPatternsTestCase):

    urlpatterns = [
        path("api/", include("product.urls")),
    ]

    def setUp(self):
        self.client = APIClient()

    def test_product_lists(self):
        response = self.client.get(path="/api/products/", format="json")
        assert response.status_code == 200

