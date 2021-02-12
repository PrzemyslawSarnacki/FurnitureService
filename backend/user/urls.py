from django.urls import path
from .views import (
    UserIDView,
    CountryListView,
    AddressListView,
    AddressCreateView,
    AddressUpdateView,
    AddressDeleteView,
)

urlpatterns = [
    path("user-id/", UserIDView.as_view(), name="user-id"),
    path("countries/", CountryListView.as_view(), name="country-list"),
    path("addresses/", AddressListView.as_view(), name="address-list"),
    path("addresses/create/", AddressCreateView.as_view(), name="address-create"),
    path("addresses/<pk>/update/", AddressUpdateView.as_view(), name="address-update"),
    path("addresses/<pk>/delete/", AddressDeleteView.as_view(), name="address-delete"),
]