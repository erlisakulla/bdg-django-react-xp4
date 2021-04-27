from django.contrib.auth.models import Permission
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from rest_framework import viewsets, generics, status, mixins
from rest_framework.schemas import inspectors
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import (
    IsAdminUser,
    IsAuthenticated,
    SAFE_METHODS,
    DjangoModelPermissions,
    BasePermission,
)
from rest_framework_simplejwt.models import TokenUser
from drf_yasg.utils import swagger_auto_schema

from Game.models import Game, DemandPattern, PlayerGame, Week
from Game.serializers import (
    GameSerializer,
    DemandPatternSerializer,
    PlayerGameSerializer,
    WeekSerializer,
    RoleWeekSerializer,
    OrderSerializer,
    NullSerializer,
)


# Permission to edit the game : only by instructor
class GameUserWritePermission(BasePermission):
    message = "editing only by the instructor "

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.instructor == request.user


# Creation possible by only instructor
class GameCreatePermission(BasePermission):
    message = "creating only by the instructor "

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user.is_instructor


# Setting up requests for some game actions
class GameActions(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, GameCreatePermission, GameUserWritePermission]
    queryset = Game.objects.all()

    def get_serializer_class(self):
        return GameSerializer

    # list all games created by logged in user
    def list(self, request):
        queryset = Game.objects.all().filter(instructor=request.user)
        serializer = GameSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        user = request.user
        serializer = GameSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save(instructor=user)
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_406_NOT_ACCEPTABLE)

    # Get list of all games created by instructors - game/all/
    @action(detail=False)
    def all(self, request):
        allgame = Game.objects.all()
        serialized = GameSerializer(allgame, many=True)
        return Response(serialized.data)

    # Getting all available roles a player can join in a game - game/{id}/getavailableroles/
    @action(detail=True, methods=['get'])
    @swagger_auto_schema(operation_description="Availiable roles in the selected game", responses={200: "Availiable Roles"})
    def getavailableroles(self, request, pk=None):
        game = self.get_object()
        roles = game.gameroles.all().filter(user_id=None)
        serialize = PlayerGameSerializer(roles, many=True)
        return Response(serialize.data)

    # Getting all week instances of a game - game/{id}/getallweeks/
    @action(detail=True, methods=['get'])
    def getallweeks(self, request, pk=None):
        game = self.get_object()
        try: 
            role = game.gameroles.get(user_id=self.request.user)
            if role:
                weeks = role.roleweeks.all()
                serialize = WeekSerializer(weeks, many=True)
                return Response(serialize.data)
        except:
            return Response({"detail": "Not registered for this game"}, status=status.HTTP_403_FORBIDDEN)
            

# List of demand patterns - game/demand/
class DemandList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated, GameCreatePermission]
    serializer_class = DemandPatternSerializer

    def get_queryset(self):
        user = self.request.user
        return DemandPattern.objects.filter(instructor=user)

    def perform_create(self, serializer):
        serializer.save(instructor=self.request.user)


# Setting up requests for some role actions
class PlayerGameActions(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]
    queryset = PlayerGame.objects.all()

    def get_serializer_class(self):
        if self.action == 'postorder':
            return OrderSerializer
        if self.action == 'roleregister': 
            return NullSerializer
        return PlayerGameSerializer

    # List of all roles the user has registered for - game/role/all/
    @action(detail=False)
    def all(self, request):
        allroles = PlayerGame.objects.all().filter(user_id=request.user)
        serialized = PlayerGameSerializer(allroles, many=True)
        return Response(serialized.data)

    # User registration for roles - game/role/{id}/roleregister
    @action(detail=True, methods=['patch'])
    def roleregister(self, request, pk=None):
        user = request.user
        role = self.get_object()
        if user.is_instructor:
            return Response({"detail": "Only a Player can Join a Game"}, status=status.HTTP_406_NOT_ACCEPTABLE)
        if(role.user_id):
            return Response({"detail": "Role already assigned to a Player"}, status=status.HTTP_406_NOT_ACCEPTABLE)
        serialized = PlayerGameSerializer(
            role, data={"user_id": user.id}, partial=True)
        if(serialized.is_valid()):
            serialized.save()
            return Response(serialized.data)
        else:
            return Response(serialized.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

    # Path for posting beer order for current week - game/role/{id}/postorder/
    @action(detail=True, methods=['post'])
    @swagger_auto_schema(operation_description="Order Beer")
    def postorder(self, request, pk=None):
        user = request.user
        role = self.get_object()
        if role.user_id == user:
            serialized = OrderSerializer(data=request.data)
            if serialized.is_valid():
                roundcompleted = role.game_id.rounds_completed
                currentweek = role.roleweeks.all().filter(week_num=roundcompleted+1).first()
                if role.order_status:
                    return Response({'detail': 'Order already placed'}, status=status.HTTP_429_TOO_MANY_REQUESTS)
                currentweek.order = serialized.data['quantity']
                currentweek.save()
                role.order_status = True
                role.save()
                return Response({"detail": "Order placed successfully"})
            else: 
                return Response(serialized.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
        else: 
            return Response({"detail": "Not Authorized"}, status=status.HTTP_401_UNAUTHORIZED)

    # Gets current week info - game/role/{id}/getcurrentweek/
    @action(detail=True, methods=['get'])
    @swagger_auto_schema(operation_description="Info for role's current week", responses={200: "Current week info"})
    def getcurrentweek(self, request, pk=None):
        role = self.get_object()
        if role.user_id == request.user:
            upstream = role.upstream_player
            downstream = role.downstream_player
            upstreamname = "Brewery"
            downstreamname = "Consumer"
            if upstream:
                upstreamname = upstream.role_name
            if downstream:
                downstreamname = downstream.role_name
            game = role.game_id
            weekinfo = {}
            thisweek = role.roleweeks.get(week_num=game.rounds_completed+1)
            weekinfo['role_id'] = role.pk
            weekinfo['role_name'] = role.role_name
            weekinfo['week_num'] = thisweek.week_num
            weekinfo['beginning_inventory'] = thisweek.inventory
            weekinfo['incoming_shipment'] = thisweek.incoming
            weekinfo['demand'] = thisweek.demand
            weekinfo['backorder'] = thisweek.backlog
            weekinfo['outgoing_shipment'] = thisweek.outgoing
            weekinfo['upstream'] = upstreamname
            weekinfo['downstream'] = downstreamname
            weekinfo['total_requirements'] = thisweek.demand + thisweek.backlog
            weekinfo['total_available'] = thisweek.inventory + thisweek.incoming
            weekinfo['ending_inventory'] = thisweek.inventory
            return Response(weekinfo)
        return Response({"detail": "Not Authroized"}, status=status.HTTP_403_FORBIDDEN)

    # Gets the status of proceeding to next week or not - game/role/{id}/nextroundstatus/
    @action(detail=True, methods=['get'])
    @swagger_auto_schema(operation_description="Checks other players order status", responses={200: "Ready", 401: "Not Ready/Unauthorized"})
    def nextroundstatus(self, request, pk=None):
        user = request.user
        role = self.get_object()
        if role.user_id == user:
            game = role.game_id
            roles = game.gameroles.all()
            for roleiter in roles:
                if not roleiter.order_status:
                    return Response({"everyone_has_ordered": False})
            return Response({"everyone_has_ordered": True})
        else:
            return Response({"detail": "Not Registered for this Role"}, status=status.HTTP_401_UNAUTHORIZED)

    # Geeting info for each role of the game - game/role/{roleid}/getsharedinfo/
    @action(detail=True, methods=['get'])
    @swagger_auto_schema(operation_description="Returns Other Player Info", responses={200: ""})
    def getsharedinfo(self, request, pk=None):
        role = self.get_object()
        game = role.game_id
        if role.user_id == request.user:
            roles = game.gameroles.all()
            alldetail = []
            for role in roles:
                user_id = None
                if role.user_id:
                    user_id = role.user_id.name
                alldetail.append({"role_name": role.role_name, "order_status": role.order_status})
            return Response(alldetail)
        return Response({"detail": "Not Authorized"}, status=status.HTTP_401_UNAUTHORIZED)
