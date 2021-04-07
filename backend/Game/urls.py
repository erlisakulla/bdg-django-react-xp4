
from Game.views import GameEdit
from django.urls import path, include
from Game.views import GameList,GameDetail, DemandList



urlpatterns = [
path('<int:pk>/', GameDetail.as_view(),name='detailgame'),
path('edit/<int:pk>/', GameEdit.as_view(), name="editgame"),

path('', GameList.as_view(),name='listgame'),
path('demand', DemandList.as_view(), name='demandlist')

#path("", views.index, name="index"),
#path("dashboard/", views. ,name=" "),

]
