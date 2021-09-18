from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . import models


class TaskAdmin(admin.ModelAdmin):
    list_display = 'title', 'completed', 'category'
    list_select_related = 'category',


class CategoryAdmin(admin.ModelAdmin):
    list_display = 'name',


admin.site.register(models.User, UserAdmin)
admin.site.register(models.Task, TaskAdmin)
admin.site.register(models.Category, CategoryAdmin)