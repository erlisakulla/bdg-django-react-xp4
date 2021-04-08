from rest_framework import serializers

from .models import DemandPattern, PlayerGame, game


class gameserializer(serializers.ModelSerializer):
    instructor= serializers.ReadOnlyField(source='instructor.id')
    class Meta:
        model = game
        fields = (
            "game_id",
            "rounds_completed",
            "active_status",
            "info_sharing",
            "info_delay",
            "demand_id",
            "session_length",
            "distributer_present",
            "wholesaler_present",
            "holding_cost",
            "backlog_cost",
            "rounds_completed",
            "starting_inventory",
            "instructor",
        )

class demandPatternSerializer(serializers.ModelSerializer):
    instructor= serializers.ReadOnlyField(source='instructor.id')
    class Meta:
        model = DemandPattern
        fields = (
            "demand_id",
            "weeks_num",
            "demands",
            "instructor",
        )

class playerGameSerializer(serializers.ModelSerializer):
    player_id = serializers.ReadOnlyField(source='player.id')
    class Meta:
        model = PlayerGame
        fields = (
            'player_id',
            'game_id',
            'role',
            'week_num'
        )

        
        
