from django.urls import path
from .views import (
    ItemListView,
    ItemDetailView,
    ItemCreateView,
    ItemUpdateView,
)

urlpatterns = [
    path("products/", ItemListView.as_view(), name="product-list"),
    path("products/create/", ItemCreateView.as_view(), name="product-list"),
    path("products/update/", ItemUpdateView.as_view(), name="product-list"),
    path("products/<pk>/update/", ItemUpdateView.as_view(), name="product-list"),
    path("products/<pk>/", ItemDetailView.as_view(), name="product-detail"),
]