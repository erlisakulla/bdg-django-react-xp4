from django.db import models
from User.models import User

# Create your models here.
class game(models.Model):
    session_length = models.IntegerField()
    distributer_present = models.BooleanField()
    wholesaler_present = models.BooleanField()
    holding_cost = models.FloatField(default=1)
    backlog_cost = models.FloatField(default=1)
    instructor = models.ForeignKey(User,limit_choices_to={'is_instructor': True}, on_delete=models.CASCADE)
    rounds_completed = models.IntegerField(default=0)
    starting_inventory = models.IntegerField(default=0)
