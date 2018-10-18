from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.generic import TemplateView, ListView

from abstract_user.models import CustomUser, Post, Profile

# Create your views here.

class HomepageView(ListView):
  # model = Post, CustomUser, Profile
  # context_object_name = 'post_list, user_list, profile_list'
  template_name = 'home.html'
  def get_context_data(self, **kwargs):
    context = super(HomepageView, self).get_context_data(**kwargs)
    context['user_list'] = CustomUser.objects.all().exclude(username=self.request.user); 
    context['post_list'] = Post.objects.all();
    context['profiles'] = Profile.objects.all();
    return context
  
  def get_queryset(self):
    current_user = self.request.user
    profile_list = Profile.others(current_user)
    # print(profile_list)
    return profile_list
  


# def index(request):
#   post_list = Post.objects.all()


#   return render(request, 'home.html', {'post_list': post_list})

def like(request, post_pk):

  current_user = request.user
  
  post = Post.toggle_like(current_user, post_pk)
  data = {
    'success': 'This is from the views',
    'post_likes': post.likers.all().count()
  }

  print(post)


  # return redirect('home')
  return JsonResponse(data)

def follow(request, friend):

  current_user = request.user

  profile = Profile.toggle_follow(current_user.id, friend)

  # if friend in current_user.profile.following.all():
  #   current_user.profile.following.remove(friend)
  # else:
  #   current_user.profile.following.add(friend) 

  print(profile)

  # data = {
  #   'success': 'This is from views. You toggled friend',
  #   'following': profile.following.all()
  # }

  return redirect('home')

  







  
