from rest_framework import serializers

from .models import DemandPattern, game


#from models import game

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
        "created_by",
        )

        
        
