from os import environ
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from allauth.socialaccount.models import SocialApp
from django.contrib.sites.models import Site
import os

CLIENT_ID = os.environ.get("CLIENT_ID")
CLIENT_SECRET = os.environ.get("CLIENT_SECRET")


class Command(BaseCommand):
    def handle(self, *args, **options):
        site = social_app = user = None
        try:
            site = Site.objects.create(domain="localhost:8000", name="localhost:8000")
            social_app = SocialApp.objects.create(
                provider="google",
                name="Google",
                client_id=CLIENT_ID,
                secret=CLIENT_SECRET,
            )
            social_app.sites.set([site])
            social_app.save()

            try:
                user = User.objects.get(is_superuser=True)
            except User.DoesNotExist:
                username = os.environ.get("ADMIN_USERNAME")
                email = os.environ.get("ADMIN_EMAIL")
                password = os.environ.get("ADMIN_PASSWORD")
                print("Creating account for %s (%s)" % (username, email))
                user = User.objects.create_superuser(
                    email=email, username=username, password=password
                )
                user.is_active = True
                user.is_admin = True
                user.save()

            print("Successfully created")
            print("Site: " + str(site.id))

        except Exception as e:
            print(e)
            print("Error in creating data")
            if site:
                site.delete()
            if social_app:
                social_app.delete()

            return False
