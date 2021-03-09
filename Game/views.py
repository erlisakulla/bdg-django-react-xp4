from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from Game.models import game
from Game.serializers import gameserializer
# Create your views here.

#def index(response):
#    return HttpResponse("<h1> hello zbi</hi>")
class gameview(viewsets.ModelViewSet):
        queryset = game.objects.all()
        serializer_class = gameserializer
