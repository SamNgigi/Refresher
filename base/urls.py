from django.urls import path
from . import views

urlpatterns = [
  path('', views.HomepageView.as_view(), name='home'),
  #  path('', views.index, name='home'),
   path('ajax/like/<int:post_pk>/', views.like, name='like'),
]