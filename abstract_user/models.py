from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models

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

class Post(models.Model):
  post = models.CharField(max_length = 100)
  author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='posted')
  likers =  models.ManyToManyField(CustomUser)

  def __str__(self):
    return self.post

  class Meta:
    ordering = ('post',)

