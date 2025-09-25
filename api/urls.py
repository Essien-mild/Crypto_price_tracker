from django.urls import path
from . import views

urlpatterns = [
    path("prices/", views.get_prices, name="get_prices"),
    path("", views.home, name="home"),
]