
from django.urls import path, include
from .views import CustomUserCreate, BlacklistTokenUpdateView, CustomUserInfo

app_name = 'users'

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('info/', CustomUserInfo.as_view(), name="user_info"),

    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist')
]