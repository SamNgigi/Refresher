from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models

from django.db.models.signals import post_save

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



# class ProfileManager(models.Manager):

#   def others(self):
#     all_profiles = self.get_queryset().all()

#     try:
#       if self.instance:
#         others = all_profiles.exclude(user_profile=self.instance)
#     except self.DoesNotExist:
#       pass
#     return others

#   def toggle_follow(self, current_user, friend):
#     user_profile, created = Profile.objects.get_or_create(user_profile=current_user)
#     if friend in user_profile.following.all():
#       user_profile.following.remove(friend)
#     else:
#       user_profile.following.add(friend)
#     return user_profile.following.all()


class Profile(models.Model):
  """  
  Here we use prof.following.all to get all the users a person is
  following and user.followers to get all people who a user is followed by 
  """

  user_profile = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
  following = models.ManyToManyField(CustomUser, related_name='followers')

  # objects = ProfileManager()


  def __str__(self):
    return self.user_profile.username

  class Meta:
    ordering = ('user_profile',)

  @classmethod
  def toggle_follow(cls, current_user, friend):
    profile = cls.objects.get(user_profile=current_user)
    # * I had to get the actual friend object.
    fam = CustomUser.objects.get(pk = friend)
    if fam in profile.following.all():
      profile.following.remove(fam)
    else:
      profile.following.add(fam)
    return profile.following.all()

  @classmethod
  def others(cls, current_user):
    others = cls.objects.exclude(user_profile=current_user)
    return others

  

class Post(models.Model):
  post = models.CharField(max_length = 100)
  # NOTE we use related name posted to get all articles a user has posted.
  # i.e user1.posted.all()
  author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='posted')
  likers =  models.ManyToManyField(CustomUser)

  def __str__(self):
    return self.post

  class Meta:
    ordering = ('post',)

  @classmethod
  def toggle_like(cls , user, post_id):
    post = cls.objects.get(pk=post_id)
    if user in post.likers.all():
      post.likers.remove(user)
    else:
      post.likers.add(user)
    return post


def post_save_user_receiver(sender, instance, created, *args, **kwargs):
  if created:
    new_profile = Profile.objects.get_or_create(user=instance)

post_save.connect(post_save_user_receiver, sender=CustomUser)
