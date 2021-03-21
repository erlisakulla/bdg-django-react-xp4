from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from Game.models import game
from Game.serializers import gameserializer
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, SAFE_METHODS, DjangoModelPermissions, BasePermission

# Create your views here.

#def index(response):
#    return HttpResponse("<h1> hello zbi</hi>")


class GameUserWritePermission(BasePermission):
    message="editing only by the instructor "

    def has_object_permission(self,request,view,obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.instructor==request.user


class GameList(generics.ListCreateAPIView,):
        permission_classes=[IsAdminUser]
        queryset = game.objects.all()
        serializer_class = gameserializer


class GameDetail(generics.RetrieveUpdateDestroyAPIView,GameUserWritePermission):
        permission_classes=[GameUserWritePermission]
        queryset = game.objects.all()
        serializer_class = gameserializer
