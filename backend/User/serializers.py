from rest_framework import serializers

from User.models import User

class userserializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
        "name",
        "email",
        "id",        )
