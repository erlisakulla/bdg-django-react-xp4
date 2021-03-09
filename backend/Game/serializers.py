from rest_framework import serializers

from .models import game


#from models import game

class gameserializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = game
        fields = (

        "session_length",
        "distributer_present",
        "wholesaler_present",
        "holding_cost",
        "backlog_cost",

        "rounds_completed",
        "starting_inventory",
        "instructor",

        )
        
