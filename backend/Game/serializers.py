from django.db.models import fields
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from .models import DemandPattern, PlayerGame, Week, Game


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields="__all__"
        extra_kwargs = {'instructor': {'read_only': True},'rounds_completed' :{'read_only': True}}


class DemandPatternSerializer(serializers.ModelSerializer):
    instructor = serializers.ReadOnlyField(source="instructor.id")

    class Meta:
        model = DemandPattern
        fields = (
            "demand_id",
            "weeks_num",
            "demands",
            "instructor",
        )


class PlayerGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerGame
        fields = (
            "id",
            "game_id",
            "user_id", 
            "role_name", 
            "downstream_player",
            "upstream_player",
            "order_status",
        )
    
        validators = [
            UniqueTogetherValidator(
                queryset = PlayerGame.objects.all(),
                fields = ['game_id', 'user_id'],
                message = "Players can only register for 1 role in each game"
            ),
        ]

        # model = PlayerGame
        # fields = (
        #     "id",
        #     "user_id", 
        #     "game_id", 
        #     "role_name", 
        #     "downstream_player",
        #     "upstream_player",
        #     "order_status",
        # )


class WeekSerializer(serializers.ModelSerializer):
    player_id = serializers.ReadOnlyField(source="player.id")

    class Meta:
        model = Week
        fields = (
            "player_id",
            "week_num",
            "inventory",
            "demand",
            "incoming",
            "outgoing",
            "order",
            "cost",
            "completed_status",
        )


class OrderSerializer(serializers.Serializer):
    quantity = serializers.IntegerField(min_value=0)
    class Meta:
        fields=['quantity']


class RoleWeekSerializer(serializers.ModelSerializer):
    roleweeks = serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    class Meta:
        model = PlayerGame
        fields=['id', 'user_id', 'roleweeks']

class NullSerializer(serializers.Serializer):
    pass