from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass


class Task(models.Model):
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)

    class Meta:
        ordering = 'title',

    def __str__(self):
        return self.title

