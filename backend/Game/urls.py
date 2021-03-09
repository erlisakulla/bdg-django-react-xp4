
from django.urls import path, include
from Game.views import gameview
from rest_framework import routers

router = routers.DefaultRouter()
router.register('game', gameview)


urlpatterns = [
path('', include(router.urls))

#path("", views.index, name="index"),
#path("dashboard/", views. ,name=" "),

]
