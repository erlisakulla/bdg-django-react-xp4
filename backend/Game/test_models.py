from django.test import TestCase
from .models import game, DemandPattern, PlayerGame
from User.models import User

from rest_framework.test import APITestCase

# Create your tests here.
class gameTest(TestCase):
    """ Test module for Game model """

    def setUp(self):
        instr = User.objects.create(
            email="yahoo@gmail.com",
            name="supeuser",
            password="whatever111",
            is_instructor=True,
        )
        instr2 = User.objects.create(
            email="instr2@gmail.com", name="admin", password="pass", is_instructor=True
        )
        game.objects.create(
            game_id="game1",
            session_length=55,
            distributer_present=True,
            wholesaler_present=True,
            rounds_completed=5,
            demand_id="demand1",
            instructor=instr,
        )
        game.objects.create(
            session_length=42,
            holding_cost=10,
            info_delay=5,
            info_sharing=True,
            instructor=instr2,
        )

    def test_game(self):
        userok = User.objects.get(email="yahoo@gmail.com")
        game1 = game.objects.get(instructor=userok)
        self.assertEqual(game1.session_length, 55)
        self.assertEqual(game1.game_id, "game1")
        self.assertEqual(game1.rounds_completed, 5)


class DemandPatternTest(TestCase):
    def setUp(self):
        user = instr = User.objects.create(
            email="yahoo@gmail.com",
            name="supeuser",
            password="whatever111",
            is_instructor=True,
        )
        DemandPattern.objects.create(
            demand_id="demand1",
            weeks_num=10,
            demands="1 2 3 4 5 6 7 8 9 10",
            instructor=user,
        )
        DemandPattern.objects.create(
            demand_id="demand2", weeks_num=5, demands="1 2 3 4 5", instructor=user
        )

    def test_demand(self):
        demand1 = DemandPattern.objects.get(weeks_num=10)
        self.assertEqual(demand1.demand_id, "demand1")
        self.assertEqual(demand1.weeks_num, 10)

        demand2 = DemandPattern.objects.get(demands="1 2 3 4 5")
        self.assertEqual(demand2.demand_id, "demand2")
        self.assertEqual(demand2.demands, "1 2 3 4 5")


class PlayerGameTest(TestCase):
    def setUp(self):
        instr = User.objects.create(
            email="yahoo@gmail.com",
            name="supeuser",
            password="whatever111",
            is_instructor=False,
        )
        PlayerGame.objects.create(
            player_id=instr, game_id="game1", role="distributor", week_num=2
        )
        PlayerGame.objects.create(
            player_id=instr, game_id="game2", role="distributor", week_num=12
        )

    def test_player_game(self):
        object1 = PlayerGame.objects.get(game_id="game1")

        self.assertEqual(object1.week_num, 2)