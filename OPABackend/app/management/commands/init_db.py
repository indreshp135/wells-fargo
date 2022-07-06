from os import environ
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from app.models import (
    Application,
    SOD,
    Asset,
    Action,
    SODRules,
    SodUser,
    Users,
    ExceptionRules,
)
from allauth.socialaccount.models import SocialApp
from django.contrib.sites.models import Site
import os
from uuid import uuid4

CLIENT_ID = os.environ.get("CLIENT_ID")
CLIENT_SECRET = os.environ.get("CLIENT_SECRET")
BANGALORE_EMPLOYEE = os.environ.get("BANGALORE_EMPLOYEE")
BANGALORE_MANAGER = os.environ.get("BANGALORE_MANAGER")
HYDERABAD_MANAGER = os.environ.get("HYDERABAD_MANAGER")


class Command(BaseCommand):
    def handle(self, *args, **options):
        models_created = []
        site = (
            social_app
        ) = (
            application
        ) = (
            user
        ) = (
            asset_bangalore
        ) = (
            asset_hyderabad
        ) = (
            action_read
        ) = (
            action_write
        ) = (
            user1
        ) = (
            user2
        ) = (
            user3
        ) = (
            exception_user3
        ) = (
            sod_bangalore_manager
        ) = (
            sod_bangalore_user
        ) = (
            sod_hyderabad_manager
        ) = (
            sod_rule_bangalore_manager
        ) = (
            sod_rule_bangalore_user
        ) = sod_rule_hyderabad_manager = sod_user1 = sod_user2 = sod_user3 = None
        try:
            site = Site.objects.create(domain="localhost:8000", name="localhost:8000")
            models_created.append(site)
            social_app = SocialApp.objects.create(
                provider="google",
                name="Google",
                client_id=CLIENT_ID,
                secret=CLIENT_SECRET,
            )
            social_app.sites.set([site])
            social_app.save()
            models_created.append(social_app)

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
                models_created.append(user)
            application = Application.objects.create(
                application_name="File Management System",
                application_description="File Management System",
                created_by=user,
                application_hash=str(uuid4()),
            )
            models_created.append(application)
            asset_bangalore = Asset.objects.create(
                asset_name="BANGALORE", application_id=application, created_by=user
            )
            models_created.append(asset_bangalore)
            asset_hyderabad = Asset.objects.create(
                asset_name="HYDERABAD", application_id=application, created_by=user
            )
            models_created.append(asset_hyderabad)
            action_read = Action.objects.create(
                action_name="READ", application_id=application, created_by=user
            )
            models_created.append(action_read)
            action_write = Action.objects.create(
                action_name="WRITE", application_id=application, created_by=user
            )
            models_created.append(action_write)
            user1 = Users.objects.create(
                first_name="User1",
                last_name="User1",
                email=BANGALORE_MANAGER,
                location="bangalore",
                is_manager=True,
            )
            models_created.append(user1)

            user2 = Users.objects.create(
                first_name="User2",
                last_name="User2",
                email=BANGALORE_EMPLOYEE,
                location="bangalore",
                manager=user1,
            )
            models_created.append(user2)

            user3 = Users.objects.create(
                first_name="User3",
                last_name="User3",
                email=HYDERABAD_MANAGER,
                location="hyderabad",
                is_manager=True,
            )
            models_created.append(user3)

            sod_bangalore_manager = SOD.objects.create(
                sod_name="MANAGER/BANGALORE",
                created_by=user,
                application_id=application,
            )
            models_created.append(sod_bangalore_manager)

            sod_bangalore_user = SOD.objects.create(
                sod_name="EMPLOYEE/BANGALORE",
                created_by=user,
                application_id=application,
            )
            models_created.append(sod_bangalore_user)

            sod_hyderabad_manager = SOD.objects.create(
                sod_name="MANAGER/HYDERABAD",
                created_by=user,
                application_id=application,
            )
            models_created.append(sod_hyderabad_manager)

            sod_user1 = SodUser.objects.create(
                user_id=user1,
                sod_code=sod_bangalore_manager,
                application_id=application,
            )
            models_created.append(sod_user1)

            sod_user2 = SodUser.objects.create(
                user_id=user2, sod_code=sod_bangalore_user, application_id=application
            )
            models_created.append(sod_user2)

            sod_user3 = SodUser.objects.create(
                user_id=user3,
                sod_code=sod_hyderabad_manager,
                application_id=application,
            )
            models_created.append(sod_user3)

            sod_rule_bangalore_manager = SODRules.objects.create(
                sod_code=sod_bangalore_manager,
                asset_id=asset_bangalore,
                action_id=action_read,
                sod_rule_created_by=user,
                sod_rule_approval_required=False,
                sod_rule_name="BANGALORE_MANAGER_READ",
                sod_rule_description="BANGALORE_MANAGER_READ",
            )
            models_created.append(sod_rule_bangalore_manager)

            sod_rule_bangalore_user = SODRules.objects.create(
                sod_code=sod_bangalore_user,
                asset_id=asset_bangalore,
                action_id=action_write,
                sod_rule_created_by=user,
                sod_rule_approval_required=False,
                sod_rule_name="BANGALORE_EMPLOYEE_WRITE",
                sod_rule_description="BANGALORE_EMPLOYEE_WRITE",
            )
            models_created.append(sod_rule_bangalore_user)

            sod_rule_hyderabad_manager = SODRules.objects.create(
                sod_code=sod_hyderabad_manager,
                asset_id=asset_hyderabad,
                action_id=action_read,
                sod_rule_created_by=user,
                sod_rule_approval_required=False,
                sod_rule_name="HYDERABAD_MANAGER_READ",
                sod_rule_description="HYDERABAD_MANAGER_READ",
            )
            models_created.append(sod_rule_hyderabad_manager)

            exception_user3 = ExceptionRules.objects.create(
                exception_rule_name="USER3_EXCEPTION",
                exception_rule_description="USER3_EXCEPTION",
                exception_rule_created_by=user,
                application_id=application,
                asset_id=asset_bangalore,
                action_id=action_write,
                exception_for=user3,
                exception_grand_type="AR",
            )
            models_created.append(exception_user3)

            print("Successfully created")
            print("Site: " + str(site.id))
            print("Application: " + str(application.application_hash))

        except Exception as e:
            print(e)
            print("Error in creating data")
            for model in models_created:
                model.delete()
            return False
