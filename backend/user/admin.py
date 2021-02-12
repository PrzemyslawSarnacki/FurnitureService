from django.contrib import admin
from .models import Address, UserProfile


class AddressAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "street_address",
        "city",
        "country",
        "zip",
        "phone_number",
        "address_type",
        "default",
    ]
    list_filter = ["default", "address_type", "country"]
    search_fields = ["user", "street_address", "city", "zip"]


admin.site.register(Address, AddressAdmin)
admin.site.register(UserProfile)
