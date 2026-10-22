from django.contrib import admin
from .models import College, Department


@admin.register(College)
class CollegeAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'domain', 'status', 'created_at')
    search_fields = ('name', 'slug', 'domain')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'college', 'created_at')
    search_fields = ('name', 'slug')
    list_filter = ('college',)

