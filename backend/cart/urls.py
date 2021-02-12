from django.urls import path
from .views import (
    AddToCartView,
    OrderDetailView,
    OrderQuantityUpdateView,
    PaymentView,
    AddCouponView,
    OrderItemDeleteView,
    OrderHistoryDetailView,
    PaymentListView,
)

urlpatterns = [
    path("add-to-cart/", AddToCartView.as_view(), name="add-to-cart"),
    path("order-summary/", OrderDetailView.as_view(), name="order-summary"),
    path("order-history/", OrderHistoryDetailView.as_view(), name="order-history"),
    path("checkout/", PaymentView.as_view(), name="checkout"),
    path("add-coupon/", AddCouponView.as_view(), name="add-coupon"),
    path(
        "order-items/<pk>/delete/",
        OrderItemDeleteView.as_view(),
        name="order-item-delete",
    ),
    path(
        "order-item/update-quantity/",
        OrderQuantityUpdateView.as_view(),
        name="order-item-update-quantity",
    ),
    path("payments/", PaymentListView.as_view(), name="payment-list"),
]