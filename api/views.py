from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from .models import policy,client
from django.core import serializers
# Create your views here.

def say_hello(request):
    if request.method == 'GET':
        return JsonResponse({'data':'Hello','method':'GET'})
    elif request.method == 'POST':
        return JsonResponse({'data':'Hello','method':'POST'})
    else:
        return JsonResponse({'data':'Hello','method':'unknown'})

def get_all_policies(request):
    try:
        # data = serializers.serialize("json",client.objects.all(),use_natural_primary_keys=True)
        # return HttpResponse(data, content_type='application/json')  #JsonResponse({'data':data})
        data = policy.objects.select_related('client').all().values('policy_id','date_of_purchase','fuel','vehicle_segment','premium','bodily_injury_liability','personal_injury_protection','property_damage_liability','collision','comprehensive','client__client_name','client__client_id','client__income','client__marialtal_status','client__gender','client__region','client__load_dttm')
        q = policy.objects.select_related('client').all().query
        print(q)
        data = list(data)
        return JsonResponse(data,safe=False)  #JsonResponse({'data':data})
    except Exception as e:
        print(e)
        return HttpResponse({'error': e },status=500,content_type='application/json')
