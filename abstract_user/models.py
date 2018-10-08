from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class CustomUser(AbstractUser):
  bio = models.CharField(max_length=30)
  profile_pic = models.ImageField(upload_to='profile/')

  def __str__(self):
    return self.email

