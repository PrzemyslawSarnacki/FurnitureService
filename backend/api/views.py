from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    UpdateAPIView,
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Item
import random

from .serializers import (
    ItemSerializer,
    ItemSerializer,
    ItemDetailSerializer,
)


class ItemListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ItemSerializer
    queryset = Item.objects.all()


class ItemDetailView(RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ItemDetailSerializer
    queryset = Item.objects.all()


class ItemCreateView(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ItemSerializer
    queryset = Item.objects.all()


class ItemUpdateView(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
