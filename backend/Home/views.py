from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

info = '''
<h3>
(must login)
<a href="/apiauth/login/"> REST login </a><br>

Availiable Links Swagger </h3>
<a href="/swagger"> swagger </a><br>

<a href="/redoc"> ReDoc (automated) </a>

<h3>
Availiable Links Django REST Framework (must login)  </h3>
<a href="/user/info/"> /user/info/ </a><br>

<a href="/game/"> /game/ </a>
<br>
<a href="/game/2"> /game/2 </a>


'''


def one(request):
    return HttpResponse(info, content_type='text/html')