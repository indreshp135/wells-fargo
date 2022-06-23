from django.utils.translation import gettext_lazy as _
from django.db import models
from django.template.defaultfilters import slugify


def upload_to(instance, filename):
    _, ext = filename.split(".")

    return "{}/{}.{}".format(instance.folder, instance.file_random_name, ext)


class Folder(models.Model):
    folder_name = models.CharField(max_length=100)
    folder_slug = models.SlugField(max_length=100, unique=True)

    def __str__(self):
        return self.folder_slug

    def save(self, *args, **kwargs):
        self.folder_slug = slugify(self.folder_name)
        super(Folder, self).save(*args, **kwargs)


class File(models.Model):
    file_name = models.CharField(max_length=100)
    file_random_name = models.CharField(max_length=100)

    folder = models.ForeignKey(Folder, on_delete=models.CASCADE)
    file = models.FileField(upload_to=upload_to)

    def __str__(self):
        return self.file_name

    def delete(self, *args, **kwargs):
        self.file.delete()
        super(File, self).delete(*args, **kwargs)


class Notification(models.Model):
    notification_id = models.AutoField(primary_key=True)

    notification_user = models.ForeignKey("auth.User", on_delete=models.CASCADE)
    requested_user = models.ForeignKey(
        "auth.User", on_delete=models.CASCADE, related_name="requested_user"
    )
    file = models.ForeignKey(File, on_delete=models.CASCADE)
    destination_folder = models.ForeignKey(Folder, on_delete=models.CASCADE)

    class NotificationType(models.TextChoices):
        REQUEST_DIRECT_MANAGER = "RDM", _("Request Direct Manager")
        REQUEST_LOCATION_MANAGER = "RLM", _("Request Location Manager")

    notification_type = models.CharField(
        max_length=3,
        choices=NotificationType.choices,
        default=NotificationType.REQUEST_DIRECT_MANAGER,
    )

    notification_read = models.BooleanField(default=False)

    def __str__(self):
        return str(self.notification_id)
