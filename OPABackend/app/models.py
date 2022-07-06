from django.utils.translation import gettext_lazy as _
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Application(models.Model):
    application_id = models.AutoField(primary_key=True)
    application_name = models.CharField(max_length=255)
    application_description = models.TextField()
    application_hash = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        "auth.User", related_name="created_applications", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.application_name


class SOD(models.Model):
    sod_code = models.AutoField(primary_key=True)
    sod_name = models.CharField(max_length=100)
    application_id = models.ForeignKey(Application, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        "auth.User", related_name="created_sods", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.sod_name


class Asset(models.Model):
    asset_id = models.AutoField(primary_key=True)
    asset_name = models.CharField(max_length=100)
    application_id = models.ForeignKey(Application, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        "auth.User", related_name="created_assets", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.asset_name


class Action(models.Model):
    action_id = models.AutoField(primary_key=True)
    action_name = models.CharField(max_length=100)
    application_id = models.ForeignKey(
        "Application", on_delete=models.CASCADE, null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        "auth.User", related_name="created_actions", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.action_name


class SODRules(models.Model):
    sod_rule_id = models.AutoField(primary_key=True)
    sod_code = models.ForeignKey(SOD, on_delete=models.CASCADE)
    asset_id = models.ForeignKey(Asset, on_delete=models.CASCADE)
    action_id = models.ForeignKey(Action, on_delete=models.CASCADE)
    sod_rule_name = models.CharField(max_length=100)
    sod_rule_description = models.CharField(max_length=100)
    sod_rule_approval_required = models.BooleanField(default=True)
    sod_rule_created_date = models.DateTimeField(auto_now_add=True)
    sod_rule_created_by = models.ForeignKey(
        "auth.User", related_name="sod_rule_create_by", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.sod_rule_name

    class Meta:
        verbose_name = "SOD Rule"


class Users(models.Model):
    user_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    location = models.CharField(max_length=100)
    manager = models.ForeignKey("self", on_delete=models.CASCADE, blank=True, null=True)
    is_manager = models.BooleanField(default=False)

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = "User"


@receiver(post_save, sender=Users)
def user(sender, instance, created, **kwargs):
    if instance.is_manager and not instance.manager:
        instance.manager = instance
        instance.save()

    if instance.location != instance.location.upper():
        instance.location = instance.location.upper()
        instance.save()


class ExceptionRules(models.Model):
    exception_rule_id = models.AutoField(primary_key=True)
    exception_rule_name = models.CharField(max_length=100)
    exception_rule_description = models.CharField(max_length=100)
    asset_id = models.ForeignKey(Asset, on_delete=models.CASCADE)
    action_id = models.ForeignKey(Action, on_delete=models.CASCADE)
    application_id = models.ForeignKey(Application, on_delete=models.CASCADE)

    class approval_types(models.TextChoices):
        PERMISSION_GRANTED = "PG", _("PERMISSION_GRANTED")
        PERMISSION_DENIED = "PD", _("PERMISSION_DENIED")
        APRROVAL_REQUIRED = "AR", _("APPROVAL_REQUIRED")

    exception_grand_type = models.CharField(
        max_length=2,
        choices=approval_types.choices,
        default=approval_types.PERMISSION_GRANTED,
    )
    exception_rule_created_date = models.DateTimeField(auto_now_add=True)
    exception_rule_created_by = models.ForeignKey(
        "auth.User", related_name="exception_rule_create_by", on_delete=models.CASCADE
    )
    exception_for = models.ForeignKey(
        Users, on_delete=models.CASCADE, related_name="exception_for"
    )

    def __str__(self):
        return self.exception_rule_name

    class Meta:
        verbose_name = "Exception Rule"


class SodUser(models.Model):
    soduser_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    sod_code = models.ForeignKey(SOD, on_delete=models.CASCADE)
    application_id = models.ForeignKey(Application, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.sod_code) + "-" + str(self.user_id)
