from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import TaskSerializer
from .models import Task


@api_view(['GET'])
def api_overview(request):

    api_urls = {
        'List': '/task-list/',
        'Detail View': '/task-detail/<int:pk>/',
        'Create': '/task-create/',
        'Update': '/task-update/<int:pk>/',
        'Delete': '/task-delete/<int:pk>/'
    }

    return Response(api_urls)


@api_view(['GET'])
def tasks(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)

    return Response(serializer.data)