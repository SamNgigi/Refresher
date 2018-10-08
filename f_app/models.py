from django.db import models

# Create your models here.
class Publication(models.Model):
  title = models.CharField(max_length=30)

  def __str__(self):
    return self.title

  class Meta:
    ordering = ('title',)

class Article(models.Model):
  headline = models.CharField(max_length=100)
  publication = models.ManyToManyField(Publication)

  def __str__(self):
    return self.headline

  class Meta:
    ordering = ('headline',)

class User(models.Model):
  name = models.CharField(max_length=30)

  def __str__(self):
    return self.name

  class Meta:
    ordering = ('name',)

class Post(models.Model):
  content = models.CharField(max_length=100)
  likers = models.ManyToManyField(User)

  def __str__(self):
    return self.content

  class Meta:
    ordering = ('content',)

class Friendsters(models.Model):
  user = models.OneToOneField(User, related_name='profile')
  follow = models.ManyToManyField(User, related_name=followed_by)