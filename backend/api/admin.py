from django.contrib import admin

from .models import Item, ItemVariation, Variation


class ItemVariationAdmin(admin.ModelAdmin):
    list_display = ["variation", "value", "attachment"]
    list_filter = ["variation", "variation__item"]
    search_fields = ["value"]


class ItemVariationInLineAdmin(admin.TabularInline):
    model = ItemVariation
    extra = 1


class VariationAdmin(admin.ModelAdmin):
    list_display = ["item", "name"]
    list_filter = ["item"]
    search_fields = ["name"]
    inlines = [ItemVariationInLineAdmin]


admin.site.register(ItemVariation, ItemVariationAdmin)
admin.site.register(Variation, VariationAdmin)
admin.site.register(Item)
