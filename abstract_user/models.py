from django.contrib.auth.models import AbstractUser, UserManager

# Create models here
"""  
Here we create our Custom User model as well as a corresponding manager 
for it since all models have an underlying manager.

Note that we only migrate once we have our CustomUser model and its forms
and its admin have been setup.
"""

class CustomUserManager(UserManager):
  pass

class CustomUser(AbstractUser):
  objects = CustomUserManager()