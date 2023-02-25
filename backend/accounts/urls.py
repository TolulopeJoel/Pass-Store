from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views


urlpatterns = [
    path('auth/login/', views.LoginView.as_view(), name='login'),
]

router = DefaultRouter()

router.register('users', views.UserViewset, basename='users')

urlpatterns += router.urls
