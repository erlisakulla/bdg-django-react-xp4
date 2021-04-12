from django.urls import path, include
from Game.views import (
    GameList,
    WeeksEdit,
    GameDetail,
    DemandList,
    PlayerGameEdit,
    GameEdit,
)


urlpatterns = [
    path("<int:pk>/", GameDetail.as_view(), name="detailgame"),
    path("edit/<int:pk>/", GameEdit.as_view(), name="editgame"),
    path("entergame/", PlayerGameEdit.as_view()),
    path("", GameList.as_view(), name="listgame"),
    path("demand", DemandList.as_view(), name="demandlist"),
    path("play/<int:pk>", WeeksEdit.as_view(), name="play")
    # path("", views.index, name="index"),
    # path("dashboard/", views. ,name=" "),
]
