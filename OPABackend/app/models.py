from django.db import models


class SOD(models.Model):
    sod_code = models.AutoField(primary_key=True)
    sod_name = models.CharField(max_length=100)

    def __str__(self):
        return self.sod_name


class Asset(models.Model):
    asset_id = models.AutoField(primary_key=True)
    asset_name = models.CharField(max_length=100)

    def __str__(self):
        return self.asset_name


class Action(models.Model):
    action_id = models.AutoField(primary_key=True)
    action_name = models.CharField(max_length=100)

    def __str__(self):
        return self.action_name


class SODRules(models.Model):
    sod_rule_id = models.AutoField(primary_key=True)
    sod_code = models.ForeignKey(SOD, on_delete=models.CASCADE)
    asset_id = models.ForeignKey(Asset, on_delete=models.CASCADE)
    action_id = models.ForeignKey(Action, on_delete=models.CASCADE)
    sod_rule_name = models.CharField(max_length=100)
    sod_rule_description = models.CharField(max_length=100)
    sod_rule_permission = models.BooleanField(default=True)
    sod_rule_created_date = models.DateTimeField(auto_now_add=True)
    sod_rule_updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.sod_rule_name
