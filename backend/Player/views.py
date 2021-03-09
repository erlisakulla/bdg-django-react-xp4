#from django.shortcuts import render
#from django.http import HttpResponse
# Create your views here.
#view : content of web page that will show stuff out
#each view is a function, they can be connected

#first view
#python code with html arguments
#def index(response):
#    return HttpResponse("<h1> hello zbi</hi>")
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .models import player
from .serializers import playerserializer
# Create your views here.

#def index(response):
#    return HttpResponse("<h1> hello zbi</hi>")
class playerview(viewsets.ModelViewSet):
        queryset = player.objects.all()
        serializer_class = playerserializer
