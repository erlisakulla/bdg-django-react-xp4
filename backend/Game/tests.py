from django.test import TestCase
from .models import game
from User.models import User
# Create your tests here.
class gameTest(TestCase):
    """ Test module for Game model """
    def setUp(self):
        cuser= User.objects.create(
            email='yahoo@gmail.com', name="ok", password="whatever111",is_instructor=True)
        game.objects.create(session_length=55, distributer_present=True,wholesaler_present=True,instructor=cuser)

    def test_game(self):
        userok = User.objects.get(email='yahoo@gmail.com')
        gameok = game.objects.get(instructor=userok)
        self.assertEqual(
            gameok.session_length, 55)