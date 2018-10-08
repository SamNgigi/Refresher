from django.shortcuts import render
from django.urls import reverse_lazy
from django.views import generic

from .forms import CustomUserCreator

# Create your views here.
class SignUp(generic.CreateView):
  form_class = CustomUserCreator
  success_url = reverse_lazy('login')
  template_name = 'registration/sign_up.html'
