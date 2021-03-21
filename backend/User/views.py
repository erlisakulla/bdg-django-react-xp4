from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from User.models import User
from User.serializers import userserializer
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, SAFE_METHODS, DjangoModelPermissions, BasePermission

# Create your views here.

#def index(response):
#    return HttpResponse("<h1> hello zbi</hi>")



class UserUserWritePermission(BasePermission):
    message="editing only by the user "

    def has_object_permission(self,request,view,obj):
        if request.method in SAFE_METHODS:
            return True
        return obj==request.user

class UserList(generics.ListCreateAPIView):
       # permission_classes=[DjangoModelPermissions]
        queryset = User.objects.all()
        serializer_class = userserializer


class UserDetail(generics.RetrieveAPIView,UserUserWritePermission):
       # permission_classes=[UserUserWritePermission]
        queryset = User.objects.all()
        serializer_class = userserializer