from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . import models


class TaskAdmin(admin.ModelAdmin):
    list_display = 'title', 'completed'


admin.site.register(models.User, UserAdmin)
admin.site.register(models.Task, TaskAdmin)
