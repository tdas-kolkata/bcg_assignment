# from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from .models import policy,client
import json
from django.db import connection
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
        # q = policy.objects.select_related('client').all().query
        # print(q)
        data = list(data)
        response = JsonResponse(data,safe=False)  #JsonResponse({'data':data})
        return response
    except Exception as e:
        print(e)
        return HttpResponse({'error': e },status=500,content_type='application/json')


def add_user(request):
    try:
        if request.method == 'POST':
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            if body['client_name']=='' or body['client_name']==None or body['income']=="" or body['income'] == None:
                response = JsonResponse({'msg':f'Client name is blank or income is zero'},safe=False)  #JsonResponse({'data':data})
                response.status_code = 400
                return response
            marital_status = True if body['marital_status']=='Y' else False
            income = int(body['income'])
            # print(body['marital_status'])
            
            newclient = client(client_name=body['client_name'],income=income,marialtal_status=marital_status,gender=body['gender'],region=body['region'])
            newclient.save()
            print(newclient.client_id)
            response = JsonResponse({'msg':f'ADDED NEW USER WITH USER ID - {newclient.client_id}'},safe=False)  #JsonResponse({'data':data})
            response.status_code = 201
            return response
    except :
        response = JsonResponse({'msg':f'something went wrong'})  #JsonResponse({'data':data})
        response.status_code = 500
        return response

def makeBoolean(value):
    return True if value=='Y' else False

def add_policy(request):
    try:
        if request.method == 'POST':
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            # print(body)
            if body['client_id']=='' or int(body['premium'])>1000000 or body['purchase_date'] == "":
                response = JsonResponse({'msg':f'Client id is blank or purchase date is blank or premium is more than 1 million'},safe=False)  #JsonResponse({'data':data})
                response.status_code = 400
                return response
            policyClient = client.objects.get(pk=int(body['client_id']))
            newpolicy = policy(date_of_purchase=body['purchase_date'],fuel=body['fuel'],vehicle_segment=body['vehicle_segment'],premium=int(body['premium']),bodily_injury_liability=makeBoolean(body['bodily_injury_liability']),personal_injury_protection=makeBoolean(body['personal_injury_protection']),property_damage_liability=makeBoolean(body['property_damage_liability']),collision=makeBoolean(body['collision']),comprehensive=makeBoolean(body['comprehensive']),client=policyClient)
            newpolicy.save()
            response = JsonResponse({'msg':f'ADDED NEW POLICY WITH POLICY ID - {newpolicy.policy_id}'},safe=False)  #JsonResponse({'data':data})
            response.status_code = 201
            return response
    except Exception as e:
        print(e)
        response = JsonResponse({'msg':f'something went wrong'})  #JsonResponse({'data':data})
        response.status_code = 500
        return response

def policy_details(request,policy_id):
    try:
        if request.method == 'GET':
            data = policy.objects.select_related('client').filter(policy_id=policy_id).values('policy_id','date_of_purchase','fuel','vehicle_segment','premium','bodily_injury_liability','personal_injury_protection','property_damage_liability','collision','comprehensive','client__client_name','client__client_id','client__income','client__marialtal_status','client__gender','client__region','client__load_dttm')
            data = list(data)
            print(data)
            response = JsonResponse(data,safe=False)
            return response
        elif request.method == 'PUT':
            print(f'UPDATING POLCY NO {policy_id}')
            body_unicode = str(request.body.decode("utf-8"))
            # print(body_unicode)
            body = json.loads(body_unicode)
            # print(body)
            premium = int(body['premium'])
            if(premium > 1000000):
                response = JsonResponse({'msg':f'premium is more than 1 million'},safe=False)  #JsonResponse({'data':data})
                response.status_code = 400
                return response
            policyItem = policy.objects.get(pk=int(policy_id))
            policyItem.fuel = body['fuel']
            policyItem.vehicle_segment=body['vehicle_segment']
            policyItem.premium = premium
            # print('premium is -' + str(premium))
            policyItem.bodily_injury_liability=makeBoolean(body['bodily_injury_liability'])
            policyItem.personal_injury_protection=makeBoolean(body['personal_injury_protection'])
            policyItem.property_damage_liability=makeBoolean(body['property_damage_liability'])
            policyItem.collision=makeBoolean(body['collision'])
            policyItem.comprehensive=makeBoolean(body['comprehensive'])
            policyItem.save()
            response = JsonResponse({'msg':f'POLCY NO {policy_id} UPDATED SUCCESSFULLY'},safe=False)  #JsonResponse({'data':data})
            response.status_code = 200
            return response
    except Exception as e:
        print(e)
        response = JsonResponse({'msg':f'something went wrong'})  #JsonResponse({'data':data})
        response.status_code = 500
        return response 

def sales_data(request, region):
    with connection.cursor() as cursor:
        cursor.execute('''select  DATE_PART('month',a.date_of_purchase) as month,count(distinct a.policy_id)
                        from public."api_policy" as a, public."api_client" as b
                        where a.client_id = b.client_id
                        and b.region = %s
                        group by month
                        order by month''',[region])
        rows = cursor.fetchall()
        sales_arr = [0]*12
        for month_no,policy_count in rows:
            sales_arr[int(month_no)-1] = policy_count
        print(sales_arr)
        jsonData = {}
        jsonData['sales_arr'] = sales_arr
    response = JsonResponse(jsonData,safe=False)  #JsonResponse({'data':data})
    response.status_code = 200
    return response
