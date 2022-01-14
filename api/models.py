from django.db import          models
from django.utils import timezone

# Create your models here.

class client (models.Model):
    client_id = models.AutoField(primary_key=True)
    client_name = models.CharField(max_length=50)
    income = models.IntegerField(default=0)
    marialtal_status = models.BooleanField(default=True)
    gender = models.CharField(max_length=8,default='')
    region = models.CharField(max_length=20)
    load_dttm = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.client_name

class policy (models.Model):
    policy_id = models.AutoField(primary_key=True)
    date_of_purchase = models.DateField()
    fuel = models.CharField(max_length=5)
    vehicle_segment = models.CharField(max_length=1)
    premium = models.IntegerField(default=0)
    bodily_injury_liability	 = models.BooleanField()
    personal_injury_protection = models.BooleanField()
    property_damage_liability = models.BooleanField()   
    collision = models.BooleanField()
    comprehensive = models.BooleanField()
    client = models.ForeignKey(client,on_delete=models.CASCADE)

    def __str__(self):
        return str(self.policy_id)