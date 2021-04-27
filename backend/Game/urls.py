from django.urls import path, include, re_path
from rest_framework import permissions, routers
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from Game.views import (
    GameActions,
    PlayerGameActions,
    DemandList,
)

# Creating routes based on views
router = routers.DefaultRouter()
router.register("", GameActions)
router.register("role", PlayerGameActions, 'Role')

urlpatterns = [
    path("", include(router.urls)),
    path("demand", DemandList.as_view(), name="demandlist"),
]
