
from django.urls import path, include
from Game.views import GameList,GameDetail



urlpatterns = [
path('<int:pk>/', GameDetail.as_view(),name='detailgame'),

path('', GameList.as_view(),name='listgame')

#path("", views.index, name="index"),
#path("dashboard/", views. ,name=" "),

]
