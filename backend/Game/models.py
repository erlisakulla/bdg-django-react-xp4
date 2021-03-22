from django.db import models
from User.models import User

# Create your models here.
class game(models.Model):
    session_length = models.IntegerField()
    distributer_present = models.BooleanField()
    wholesaler_present = models.BooleanField()
    holding_cost = models.FloatField()
    backlog_cost = models.FloatField()
    instructor = models.ForeignKey(User,limit_choices_to={'is_instructor': True}, on_delete=models.CASCADE)
    #player_ids = arr strings
    rounds_completed = models.IntegerField()
    starting_inventory = models.IntegerField()
