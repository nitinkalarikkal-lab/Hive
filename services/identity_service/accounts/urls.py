from django.urls import path
from .views import RegisterView, CurrentUserView

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('me/', CurrentUserView.as_view(), name='current-user'),
]