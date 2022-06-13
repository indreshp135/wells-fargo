from django.contrib import admin
from .models import SOD, Asset, Action, SODRules

# Register your models here.
admin.site.register(Action)
admin.site.register(Asset)
admin.site.register(SOD)
admin.site.register(SODRules)
