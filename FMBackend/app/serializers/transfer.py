from rest_framework import serializers


class TransferSerializer(serializers.Serializer):
    file_random_name = serializers.CharField()
    destination_folder = serializers.CharField()


class TransferProceedSerializer(serializers.Serializer):
    notification_id = serializers.IntegerField()
    action_accepted = serializers.BooleanField()


class NotificationSerializer(serializers.Serializer):
    notification_id = serializers.IntegerField()
    notification_message = serializers.CharField()
    notification_type = serializers.CharField()
