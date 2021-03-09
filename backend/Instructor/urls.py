
from django.urls import path, include
from Instructor.views import instructorview
from rest_framework import routers

router = routers.DefaultRouter()
router.register('instructor', instructorview)

urlpatterns = [
path('', include(router.urls))
#path("instructor/login/", views. ,name=" " ),
#path("instructor/register/", views. ,name=" " ),,#says that page with path "", shows view named index
 #says that page with path "", shows view named index

]
