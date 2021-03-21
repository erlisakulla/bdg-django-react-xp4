
from django.urls import path, include
from User.views import UserDetail,UserList

urlpatterns = [
path('<int:pk>/', UserDetail.as_view(),name='detailuser'),

path('', UserList.as_view(),name='listuser')

#path("", views.index, name="index"),
#path("dashboard/", views. ,name=" "),

]
