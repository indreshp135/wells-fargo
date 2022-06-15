import uuid
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
