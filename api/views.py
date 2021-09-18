from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status
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
def task_list(request):
    tasks = Task.objects.all().order_by('-pk')
    serializer = TaskSerializer(tasks, many=True)

    return Response(serializer.data, status.HTTP_200_OK)


@api_view(['GET'])
def task_detail(request, pk):
    task = Task.objects.get(pk=pk)
    serializer = TaskSerializer(task, many=False)

    return Response(serializer.data, status.HTTP_200_OK)


@api_view(['POST'])
def task_create(request):
    serializer = TaskSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status.HTTP_201_CREATED)

    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def task_update(request, pk):
    task = Task.objects.get(pk=pk)
    serializer = TaskSerializer(instance=task, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status.HTTP_200_OK)

    return Response(serializer.erros, status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def task_delete(request, pk):
    task = Task.objects.get(pk=pk)
    task.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)