from django.urls import path
from .views import UserListView, UserCreateView, UserUpdateView

urlpatterns = [
    path('', UserListView.as_view(), name='user-list'),
    path('create/', UserCreateView.as_view(), name='user-create'),
     path('update/<int:user_id>', UserUpdateView.as_view(), name='user-update'),
]
