from django.shortcuts import render
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
  post = Post.toggle_like(current_user, post_pk)

  # print(post)


  return render(request, 'home.html')






  
