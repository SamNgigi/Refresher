from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser

class CustomUserCreator(UserCreationForm):
  """  
  This class is used as an update to the default UserCreationForm. It
  points to our new CustomUser.
  """
  class Meta(UserCreationForm.Meta):
    model = CustomUser
    fields = ('username', 'email')

class CustomUserChangeForm(UserChangeForm):
  """
  This is an update to the default UserChangeForm
  """
  class Meta:
    model = CustomUser
    fields = UserChangeForm.Meta.fields