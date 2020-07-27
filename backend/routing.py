from django.urls import path
from .consumers import CommentConsumer

websocket_urlpatterns = [
    path('ws/comment/<int:issueId>/<str:token>/', CommentConsumer),
]
