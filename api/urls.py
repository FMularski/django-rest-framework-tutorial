from django.urls import path
from . import views


urlpatterns = [
    path('', views.api_overview, name='api_overview'),
    path('task-list/', views.task_list, name='task_list'),
    path('task-detail/<int:pk>/', views.task_detail, name='task_detail'),
    path('task-create/', views.task_create, name='task_create')
]