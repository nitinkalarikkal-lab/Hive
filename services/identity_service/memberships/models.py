import uuid
from django.db import models
from colleges.models import College, Department


class Community(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    college = models.ForeignKey(College, on_delete=models.CASCADE, related_name='communities')
    department = models.ForeignKey(
        Department, on_delete=models.CASCADE,
        null=True, blank=True, related_name='communities'
    )
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255)
    visibility = models.CharField(max_length=50, default='public')
    created_by_user_id = models.UUIDField()  # UUID reference — avoids cross-service FK
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Membership(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    community = models.ForeignKey(Community, on_delete=models.CASCADE, related_name='memberships')
    user_id = models.UUIDField()  # UUID reference to User — no cross-service FK
    role = models.CharField(max_length=50, default='member')  # e.g. member, moderator
    status = models.CharField(max_length=50, default='active')
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('community', 'user_id')

    def __str__(self):
        return f"User {self.user_id} in {self.community.name}"
