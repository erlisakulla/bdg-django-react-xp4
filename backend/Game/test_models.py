from django.test import TestCase
from .models import Game, DemandPattern, PlayerGame, Week
from User.models import User


class gameTest(TestCase):


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
		demand = DemandPattern.objects.create(demand_id="demand1", weeks_num=5, demands="1 2 3 4 5", instructor=instr)
		Game.objects.create(
			game_id="game1",
			session_length=55,
			distributor_present=True,
			wholesaler_present=True,
			rounds_completed=5,
			demand_id=demand,
			instructor=instr,
		)
		Game.objects.create(
			session_length=42,
			holding_cost=10,
			info_delay=5,
			info_sharing=True,
			instructor=instr2,
		)

def test_game(self):
	userok = User.objects.get(email="yahoo@gmail.com")
	game1 = Game.objects.get(instructor=userok)
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
		user = User.objects.create(
			email="yahoo@gmail.com",
			name="supeuser",
			password="whatever111",
			is_instructor=True,
		)

		demand = DemandPattern.objects.create(
			demand_id="demand1",
			weeks_num=10,
			demands="1 2 3 4 5 6 7 8 9 10",
			instructor=user,
		)
		instr = User.objects.create(
			email="yahooqq@gmail.com",
			name="supeuser",
			password="whatever111",
			is_instructor=False,
		)
		gamed1 = Game.objects.create(
			game_id="game16",
			session_length=55,
			distributor_present=True,
			wholesaler_present=True,
			rounds_completed=5,
			demand_id=demand.demand_id,
			instructor=instr,
		)
		
		unique = PlayerGame.objects.create(
			user_id=instr, game_id=gamed1, role_name="distributor"
		)
		

	def test_player_game(self):
		user = User.objects.get(email="yahooqq@gmail.com")
		#gameski = Game.objects.get(game_id="game16")
		object1 = PlayerGame.objects.get(user_id=user)
		self.assertEqual(object1.role_name, "distributor")


	class WeeksTest(TestCase):
		def setUp(self):
			instr = User.objects.create(
			email="user@test.com",
			name="supeuser",
			password="whatever111",
			is_instructor=False,
			)
			game = Game.objects.create(
				game_id="game1",
				session_length=55,
				distributor_present=True,
				wholesaler_present=True,
				rounds_completed=5,
				demand_id="demand1",
				instructor=instr,
			)
			game1 = Game.objects.create(
				game_id="game1",
				session_length=55,
				distributor_present=True,
				wholesaler_present=True,
				rounds_completed=5,
				demand_id="demand1",
				instructor=instr,
			)
			Week.objects.create(player_id=instr, game_id=game, week_num=2)
			Week.objects.create(
				player_id=instr, game_id=game1, demand=12, week_num=5, cost=12
			)

		def test_player_game(self):
			object1 = Week.objects.get(game_id=game1)
			self.assertEqual(object1.inventory, 0)
			self.assertEqual(object1.cost, 0)
			self.assertEqual(object1.demand, 0)

			object2 = Week.objects.get(game_id=game)
			self.assertEqual(object2.week_num, 5)
			self.assertEqual(object2.cost, 12)
			self.assertEqual(object2.demand, 12)