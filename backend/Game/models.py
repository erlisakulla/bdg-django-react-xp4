from django.db import models
from django.core.validators import int_list_validator
from User.models import User

# Create your models here.
class game(models.Model):
    game_id = models.CharField(max_length=32, default="id", null=False, blank=False, primary_key=True)
    session_length = models.IntegerField(default=26)
    distributer_present = models.BooleanField(default=True)
    wholesaler_present = models.BooleanField(default=True)
    holding_cost = models.FloatField(default=1)
    backlog_cost = models.FloatField(default=1)
    instructor = models.ForeignKey(User,limit_choices_to={'is_instructor': True}, on_delete=models.CASCADE)
    rounds_completed = models.IntegerField(default=0)
    starting_inventory = models.IntegerField(default=0)
    active_status = models.BooleanField(default=True)
    info_sharing = models.BooleanField(default=False)
    info_delay = models.IntegerField(default=2)
    demand_id = models.CharField(max_length=32, blank=False, null=False)

class DemandPattern(models.Model):
    demand_id = models.CharField(max_length=32, null=False, default="id", blank=False, primary_key=True)
    weeks_num = models.IntegerField(blank=False, null=False)
    demands = models.CharField(max_length = 128, null=False, blank=False, validators=[int_list_validator])
    instructor = models.ForeignKey(User, limit_choices_to={'is_instructor' : True}, on_delete=models.CASCADE)


class PlayerGame(models.Model):
    player_id = models.ForeignKey(User, on_delete=models.CASCADE)
    game_id = models.CharField(max_length=32, default='no-game', null=False, blank=False)
    role = models.CharField(max_length=32, default='no-role', null=False, blank=False)
    week_num = models.IntegerField(default=1, null=False, blank=False)