from django.contrib import admin
from .models import User, Profile


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'display_name', 'status', 'is_staff', 'created_at')
    search_fields = ('email', 'display_name')
    list_filter = ('status', 'is_staff', 'is_superuser')


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'college_id', 'department_id', 'year_of_study')
    search_fields = ('user__email', 'user__display_name')

