from rest_framework import serializers

from Player.models import player

class playerserializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = player
        fields = (

        "name",
        "email",
        "password",
        "instructor",
        "current_game",
        "inventory",
        "backorder",
        "downstream_player",
        "upstream_player",
        "id",

        )
