from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.schemas import inspectors
from Game.models import game, DemandPattern, PlayerGame
from Game.serializers import gameserializer, demandPatternSerializer, playerGameSerializer
from rest_framework import generics
from rest_framework.permissions import IsAdminUser,IsAuthenticated, SAFE_METHODS, DjangoModelPermissions, BasePermission
from rest_framework_simplejwt.models import TokenUser

#permission to edit the game : only by instructor
class GameUserWritePermission(BasePermission):
    message="editing only by the instructor "

    def has_object_permission(self,request,view,obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.instructor==request.user

#creation possible by only instructor
class GameCreatePermission(BasePermission):
    message="creating only by the instructor "

    def has_permission(self,request,view):
        if request.method in SAFE_METHODS:
            return True
        return request.user.is_instructor

class GameList(generics.ListCreateAPIView):
    #must be authenticated to view game 
        permission_classes=[IsAuthenticated,GameCreatePermission]
        serializer_class = gameserializer

        def get_queryset(self):
            user = self.request.user
            return game.objects.filter(instructor=user)

        #save game with instructor= logged in instructor
        def perform_create(self, serializer):
            print(serializer)
            serializer.save(instructor=self.request.user)

#View to get specific games with game id /game/gameid created by loggedin instructor 
class GameDetail(generics.RetrieveUpdateDestroyAPIView,GameUserWritePermission):
        permission_classes=[IsAuthenticated,GameUserWritePermission]
        queryset = game.objects.all()
        serializer_class = gameserializer

class GameEdit(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated, GameUserWritePermission]
    serializer_class = gameserializer

    def get_queryset(self):
        return game.objects.filter(game_id = self.request.data['game_id'])

    def perform_update(self, serializer):
        serializer.save(instructor = self.request.user)

class DemandList(generics.ListCreateAPIView):

    permission_classes = [IsAuthenticated, GameCreatePermission]
    serializer_class = demandPatternSerializer

    def get_queryset(self):
        user = self.request.user
        return DemandPattern.objects.filter(instructor = user)

    def perform_create(self, serializer):
        serializer.save(instructor = self.request.user)
        

class PlayerGameEdit(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = playerGameSerializer

    def get_queryset(self):
        role = self.request.GET['role']
        game_id = self.request.GET['game_id']
        return PlayerGame.objects.filter(role = role, game_id = game_id)

    def perform_create(self, serializer):
        print(self.request)
        serializer.save(player_id = self.request.user)