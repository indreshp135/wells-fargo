from django.core.management.base import BaseCommand
import csv
import os
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    def handle(self, *args, **options):
        file = os.path.join(os.getcwd(), "details/users.csv")

        data = csv.reader(open(file), delimiter=",")
        next(data)
        for row in data:
            if row[0] != "Number":
                Post = User()
                Post.set_password(row[0])
                Post.is_superuser = 0
                Post.username = row[1]
                Post.first_name = row[2]
                Post.email = row[3]
                Post.last_name = row[4]
                Post.save()
