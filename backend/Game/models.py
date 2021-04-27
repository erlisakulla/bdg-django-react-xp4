from django.db import models
from django.core.validators import int_list_validator
from django.dispatch import receiver
from django.db.models.signals import post_save

from User.models import User


# Demand Pattern model
class DemandPattern(models.Model):
    demand_id = models.CharField(max_length=32, null=False, blank=False, primary_key=True)
    weeks_num = models.IntegerField(blank=False, null=False)
    demands = models.CharField(max_length=128, null=False, blank=False, validators=[int_list_validator])
    instructor = models.ForeignKey(User, limit_choices_to={"is_instructor": True}, on_delete=models.CASCADE)

    def __str__(self):
        return "Demand Pattern " + str(self.demand_id) + " - Num. Weeks: " + str(self.weeks_num)


# Game model
class Game(models.Model):
    game_id = models.CharField(max_length=32, null=False, blank=False, primary_key=True)
    session_length = models.IntegerField(default=26)
    distributor_present = models.BooleanField(default=True)
    wholesaler_present = models.BooleanField(default=True)
    holding_cost = models.FloatField(default=1)
    backlog_cost = models.FloatField(default=1)
    instructor = models.ForeignKey(User, limit_choices_to={"is_instructor": True}, on_delete=models.CASCADE)
    rounds_completed = models.IntegerField(default=0)
    starting_inventory = models.IntegerField(default=0)
    active_status = models.BooleanField(default=True)
    info_sharing = models.BooleanField(default=False)
    info_delay = models.IntegerField(default=2)
    demand = models.ForeignKey(DemandPattern, on_delete=models.DO_NOTHING, related_name='gamedemand')

    def __str__(self):
        return "Game " + str(self.game_id)


# Game Player model
class PlayerGame(models.Model):
    user_id = models.ForeignKey(User, null=True, blank=True, limit_choices_to={'is_instructor': False}, on_delete=models.CASCADE,related_name="playerroles")
    game_id = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='gameroles', null=True)
    role_name = models.CharField(max_length=32, default="no-role", null=False, blank=False)
    downstream_player = models.ForeignKey("self", null=True, blank=True, on_delete=models.CASCADE, related_name='%(class)s_downstream_player')
    upstream_player = models.ForeignKey("self", null=True, blank=True, on_delete=models.CASCADE, related_name='%(class)s_upstream_player')
    order_status = models.BooleanField(default=False)

    class Meta:
        unique_together = ('user_id', 'game_id')

    def __str__(self):
        return str(self.pk) + " - " +(self.role_name + " - Game " + str(self.game_id.game_id))


# Week model
class Week(models.Model):
    player_id = models.ForeignKey(PlayerGame, on_delete=models.CASCADE, related_name="roleweeks")
    week_num = models.IntegerField(default=1, null=True, blank=False)
    inventory = models.IntegerField(default=0, null=True, blank=False)
    backlog = models.IntegerField(default=0, null=True, blank=False)
    demand = models.IntegerField(default=0, null=True, blank=False)
    incoming = models.IntegerField(default=0, null=True, blank=False)
    outgoing = models.IntegerField(default=0, null=True, blank=False)
    order = models.IntegerField(default=None, null=True, blank=True)
    cost = models.IntegerField(default=0, null=True, blank=False)
    completed_status = models.BooleanField(default=False, null=True, blank=False)

    def __str__(self):
        return "Week " + str(self.week_num) + " - " + self.player_id.role_name + " - Game: " + str(self.player_id.game_id.game_id)


# Creating roles on game creation and assigning upstream and downstream roles
@receiver(post_save, sender=Game)
def createRoles(sender, instance, created, **kwargs):
    if created:
        retailer = PlayerGame.objects.create(role_name="Retailer", game_id=instance)
        factory = PlayerGame.objects.create(role_name="Factory", game_id=instance)

        if (instance.wholesaler_present and instance.distributor_present):
            wholesaler = PlayerGame.objects.create(role_name="Wholesaler", game_id=instance)
            distributor = PlayerGame.objects.create(role_name="Distributor", game_id=instance)

            retailer.upstream_player = wholesaler

            wholesaler.downstream_player = retailer
            wholesaler.upstream_player = distributor

            distributor.downstream_player = wholesaler
            distributor.upstream_player = factory

            factory.downstream_player = distributor

            wholesaler.save()
            distributor.save()
        elif (instance.wholesaler_present):
            wholesaler = PlayerGame.objects.create(role_name="Wholesaler", game_id=instance)
            retailer.upstream_player = wholesaler
            wholesaler.downstream_player = retailer
            wholesaler.upstream_player = factory

            factory.downstream_player = wholesaler
            wholesaler.save()
        elif (instance.distributor_present):
            distributor = PlayerGame.objects.create(role_name="Distributor", game_id=instance)
            retailer.upstream_player = distributor

            distributor.downstream_player = retailer
            distributor.upstream_player = factory

            factory.downstream_player = distributor
            distributor.save()
        else:
            retailer.upstream_player = factory
            factory.downstream_player = retailer

        retailer.save()
        factory.save()


# Create first week instance when roles are created
@receiver(post_save, sender=PlayerGame)
def createFirstWeek(sender, instance, created, **kwargs):
    if created:
        week = Week.objects.create(
            week_num=1, 
            player_id=instance,
            inventory=instance.game_id.starting_inventory,
            cost=instance.game_id.starting_inventory*instance.game_id.holding_cost
        )
        week.save()