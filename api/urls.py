from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from . import views

urlpatterns = [
    path('hello/',csrf_exempt(views.say_hello)),
    path('policy/all/',views.get_all_policies),
    path('customer/add/',csrf_exempt(views.add_user)),
    path('policy/add/',csrf_exempt(views.add_policy)),
    path('policy/<int:policy_id>',csrf_exempt(views.policy_details)),
    path('sales/<str:region>',csrf_exempt(views.sales_data))
] 