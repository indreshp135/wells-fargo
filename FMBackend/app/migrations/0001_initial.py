# Generated by Django 4.0.5 on 2022-06-13 09:30

import app.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Folder",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("folder_name", models.CharField(max_length=100)),
                ("folder_slug", models.SlugField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="File",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("file_name", models.CharField(max_length=100)),
                ("file_random_name", models.SlugField(max_length=100)),
                ("file", models.FileField(upload_to=app.models.upload_to)),
                (
                    "folder_name",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="app.folder"
                    ),
                ),
            ],
        ),
    ]
