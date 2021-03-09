#alternative
#this file maps views with web pages (described by they path)
from django.urls import path, include
from Player.views import playerview
from rest_framework import routers

router = routers.DefaultRouter()
router.register('player', playerview)



urlpatterns = [
path('', include(router.urls))
#path("player/login/", views. ,name=" " ),
#path("player/register/", views. ,name=" " ),#says that page with path "", shows view named index
 #says that page with path "", shows view named index

]
