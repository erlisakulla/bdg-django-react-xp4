from django.db import models
from Instructor.models import instructor
from Game.models import game
#rom django.core.validators import int_list_validator
#from game import models
# Create your models here.
class player(models.Model):
    name = models.CharField(max_length=150, default="")
    email = models.CharField(max_length=70, default="")
    password = models.CharField(max_length=70, default="")
    instructor = models.ForeignKey(instructor, on_delete=models.CASCADE)
    current_game = models.ForeignKey(game , on_delete=models.CASCADE,default='0')
    inventory = models.IntegerField(default=0)
    backorder = models.IntegerField(default=0)
    downstream_player = models.ForeignKey('self',on_delete=models.SET_NULL, null=True, default="", related_name="previous_player")
    upstream_player = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, default="", related_name="next_player")
    id = models.AutoField(auto_created=True, primary_key=True, serialize=False, default=False)
   #def __str__(self):
    #   return self.name
