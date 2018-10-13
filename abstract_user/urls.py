from django.urls import path
from . import views


urlpatterns = [
  path('signUp/', views.SignUp.as_view(), name='signUp'),
 
]

"""  
When we equate the urlpattern to an dictionary i.e urlpattern = {}

We get a type error 'set' object is not reversible
"""
