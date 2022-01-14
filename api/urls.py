from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from . import views

urlpatterns = [
    path('hello/',csrf_exempt(views.say_hello)),
    path('policy/all/',views.get_all_policies)
] 