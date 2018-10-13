from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.generic import TemplateView, ListView

from abstract_user.models import CustomUser, Post

# Create your views here.

class HomepageView(ListView):
  model = Post
  context_object_name = 'post_list'
  template_name = 'home.html'
  


# def index(request):
#   post_list = Post.objects.all()


#   return render(request, 'home.html', {'post_list': post_list})

def like(request, post_pk):

  current_user = request.user
  
    # post_id = request.POST['postID']
  post = Post.toggle_like(current_user, post_pk)
  # print(request.POST['postID'])
  data = {
    'success': 'This is from the views',
    'post_likes': post.likers.all().count()
  }

  # print(post)


  # return redirect('home')
  return JsonResponse(data)





  
