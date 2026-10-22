from django.contrib import admin
from .models import Community, Membership


@admin.register(Community)
class CommunityAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'college', 'department', 'visibility', 'created_at')
    search_fields = ('name', 'slug')
    list_filter = ('visibility', 'college')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Membership)
class MembershipAdmin(admin.ModelAdmin):
    list_display = ('community', 'user_id', 'role', 'status', 'joined_at')
    search_fields = ('community__name', 'user_id')
    list_filter = ('role', 'status')

