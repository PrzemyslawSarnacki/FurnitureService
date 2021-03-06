import random

from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from django.http import Http404
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.generics import DestroyAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView

from .models import Coupon, Order, OrderItem, Payment
from .serializers import OrderSerializer, PaymentSerializer
from api.models import Item 
from user.models import Address, UserProfile 
from cart.models import Payment, Refund 

class OrderQuantityUpdateView(APIView):
    def post(self, request, *args, **kwargs):
        slug = request.data.get("slug", None)
        variations = request.data.get("variations", [])
        if slug is None:
            return Response({"message": "Invalid data"}, status=HTTP_400_BAD_REQUEST)
        item = get_object_or_404(Item, slug=slug)
        order_qs = Order.objects.filter(user=request.user, ordered=False)
        order = order_qs[0]
        # check if the order item is in the order
        if order_qs.exists():
            order = order_qs[0]
            # check if the order item is in the order
            if order.items.filter(item__slug=item.slug).exists():
                print(variations)
                order_item = OrderItem.objects.filter(
                    item=item, user=request.user, ordered=False
                )
                if variations:
                    for v in variations:
                        order_item = order_item.filter(Q(item_variations__exact=v))
                order_item = order_item.first()
                if order_item.quantity > 1:
                    order_item.quantity -= 1
                    order_item.save()
                else:
                    order.items.remove(order_item)

                return Response(status=HTTP_200_OK)
            else:
                return Response(
                    {"message": "This item was not in your cart"},
                    status=HTTP_400_BAD_REQUEST,
                )
        else:
            return Response(
                {"message": "You do not have an active order"},
                status=HTTP_400_BAD_REQUEST,
            )


class OrderItemDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = OrderItem.objects.all()


class AddToCartView(APIView):
    def post(self, request, *args, **kwargs):
        slug = request.data.get("slug", None)
        variations = request.data.get("variations", [])
        if slug is None:
            return Response({"message": "Invalid request"}, status=HTTP_400_BAD_REQUEST)

        item = get_object_or_404(Item, slug=slug)

        order_item_qs = OrderItem.objects.filter(
            item=item, user=request.user, ordered=False
        )
        for v in variations:
            order_item_qs = order_item_qs.filter(Q(item_variations__exact=v))

        if order_item_qs.exists():
            order_item = order_item_qs.first()
            order_item.quantity += 1
            order_item.save()
        else:
            order_item = OrderItem.objects.create(
                item=item, user=request.user, ordered=False
            )
            order_item.item_variations.add(*variations)
            order_item.save()

        order_qs = Order.objects.filter(user=request.user, ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            if not order.items.filter(item__id=order_item.id).exists():
                order.items.add(order_item)
                return Response(status=HTTP_200_OK)

        else:
            ordered_date = timezone.now()
            order = Order.objects.create(user=request.user, ordered_date=ordered_date)
            order.items.add(order_item)
            return Response(status=HTTP_200_OK)


class OrderDetailView(RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        try:
            order = Order.objects.get(user=self.request.user, ordered=False)
            return order
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            # return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)


class PaymentView(APIView):
    def post(self, request, *args, **kwargs):
        order = Order.objects.get(user=self.request.user, ordered=False)
        userprofile, fl = UserProfile.objects.get_or_create(user=self.request.user)
        token = request.data.get("stripeToken")
        billing_address_id = request.data.get("selectedBillingAddress")
        shipping_address_id = request.data.get("selectedShippingAddress")
        print(shipping_address_id)
        print(billing_address_id)

        billing_address = Address.objects.get(id=billing_address_id)
        shipping_address = Address.objects.get(id=shipping_address_id)
        print((userprofile))
        userprofile.stripe_customer_id = str(random.randint(1, 100))
        userprofile.one_click_purchasing = True
        userprofile.save()

        try:
            payment = Payment()
            payment.stripe_charge_id = random.randint(1, 100)
            payment.user = self.request.user
            payment.amount = order.get_total()
            payment.save()

            order_items = order.items.all()
            order_items.update(ordered=True)
            for item in order_items:
                item.save()

            order.ordered = True
            order.payment = payment
            order.billing_address = billing_address
            order.shipping_address = shipping_address
            order.save()

            return Response(status=HTTP_200_OK)

        except Exception as e:
            # send an email to ourselves
            return Response(
                {"message": "A serious error occurred. We have been notifed."},
                status=HTTP_400_BAD_REQUEST,
            )

        return Response(
            {"message": "Invalid data received"}, status=HTTP_400_BAD_REQUEST
        )


class AddCouponView(APIView):
    def post(self, request, *args, **kwargs):
        code = request.data.get("code", None)
        if code is None:
            return Response(
                {"message": "Invalid data received"}, status=HTTP_400_BAD_REQUEST
            )
        order = Order.objects.get(user=self.request.user, ordered=False)
        coupon = get_object_or_404(Coupon, code=code)
        order.coupon = coupon
        order.save()
        return Response(status=HTTP_200_OK)


class PaymentListView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PaymentSerializer

    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)


class OrderHistoryDetailView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = OrderSerializer

    def get_object(self):
        try:
            order = Order.objects.get(user=self.request.user, ordered=True)
            return order
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
