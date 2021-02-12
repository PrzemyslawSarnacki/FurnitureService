from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.db import models
from django.db.models import Sum
from django.shortcuts import reverse

CATEGORY_CHOICES = (("S", "Shirt"), ("SW", "Sport wear"), ("OW", "Outwear"))

LABEL_CHOICES = (("P", "primary"), ("S", "secondary"), ("D", "danger"))


class Item(models.Model):
    title = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    discount_price = models.DecimalField(
        max_digits=6, decimal_places=2, blank=True, null=True
    )
    category = models.CharField(choices=CATEGORY_CHOICES, max_length=2)
    label = models.CharField(choices=LABEL_CHOICES, max_length=1)
    slug = models.SlugField()
    description = models.TextField()
    image = models.ImageField(upload_to="../media/")

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("api:product", kwargs={"slug": self.slug})

    def get_add_to_cart_url(self):
        return reverse("api:add-to-cart", kwargs={"slug": self.slug})

    def get_remove_from_cart_url(self):
        return reverse("api:remove-from-cart", kwargs={"slug": self.slug})


class Variation(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)  # size

    class Meta:
        unique_together = ("item", "name")

    def __str__(self):
        return self.name


class ItemVariation(models.Model):
    variation = models.ForeignKey(Variation, on_delete=models.CASCADE)
    value = models.CharField(max_length=50)  # S, M, L
    attachment = models.ImageField(blank=True)

    class Meta:
        unique_together = ("variation", "value")

    def __str__(self):
        return self.value
