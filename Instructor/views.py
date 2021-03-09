from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .models import instructor
from .serializers import instructorserializer
# Create your views here.

#def index(response):
#    return HttpResponse("<h1> hello zbi</hi>")

class instructorview(viewsets.ModelViewSet):
        queryset = instructor.objects.all()
        serializer_class = instructorserializer
