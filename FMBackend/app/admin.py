from django.contrib import admin

from app.models import Folder, File, Notification

# Register your models here.
admin.site.register(Folder)
admin.site.register(File)
admin.site.register(Notification)
admin.site.site_header = "File Manager Admin"
admin.site.site_title = "File Manager Admin"
admin.site.index_title = "File Manager Admin"
admin.site.site_url = None
admin.site.empty_value_display = "-"
