from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreator, CustomUserChangeForm
from .models import CustomUser

"""  
We update our Admin to use the CustomUser throughout.
"""

class CustomUserAdmin(UserAdmin):
  model = CustomUser
  add_form = CustomUserCreator
  form = CustomUserChangeForm

admin.site.register(CustomUser, CustomUserAdmin)