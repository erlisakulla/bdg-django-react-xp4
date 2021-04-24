from django.contrib import admin

# Register your models here.
from .models import Game, PlayerGame, DemandPattern, Week
admin.site.register(Game)
admin.site.register(PlayerGame)
admin.site.register(DemandPattern)
admin.site.register(Week)
