from django.contrib.auth import get_user_model
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from rest_framework.authtoken.models import Token
from .models import Issue, User, Comment
from .serializers import CommentSerializer



class CommentConsumer(WebsocketConsumer):

    def fetch_comments(self, data):
        comments = Comment.objects.filter(issue=self.issue)
        com = []
        for comment in comments:
            serializer = CommentSerializer(comment)
            com.append(serializer.data)
        content = {
            'command': 'comments',
            'comments': com
        }

        return self.send_comment(content)

    def new_comment(self, data):
        if(data['reply']!=0):
            replyId = data['reply']
            reply = Comment.objects.get(pk = replyId)
        else:
            reply = None
        new_comment = Comment(user = self.user, reply=reply, issue = self.issue, description=data['description'])
        new_comment.save()
        serializer = CommentSerializer(new_comment)

        content = {
            'command': 'new_comment',
            'comment': serializer.data
        }

        return self.send_issue_comment(content)

    def like(self, data):
        comment = Comment.objects.get(pk=data['commentId'])
        if data['status']:
            comment.likes.remove(self.user)
        else:
            comment.likes.add(self.user)
        comment.save
        serializer = CommentSerializer(comment)

        content = {
            'command': 'like',
            'comment': serializer.data
        }

        return self.send_issue_comment(content)

    commands = {
        'fetch_comments': fetch_comments,
        'new_comment': new_comment,
        'like_comment': like
    }

    def connect(self):
        self.issueId = self.scope['url_route']['kwargs']['issueId']
        self.token = self.scope['url_route']['kwargs']['token']
        self.room_group_name = 'issue_'+str(self.issueId)

        user = Token.objects.get(key=str(self.token)).user

        if user:

            try:
                self.issue = Issue.objects.get(pk=self.issueId)
                self.user = user
                async_to_sync(self.channel_layer.group_add)(
                    self.room_group_name,
                    self.channel_name
                )
                self.accept()

            except Issue.DoesNotExist:
                pass

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)

    def send_issue_comment(self, message):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'issue_comment',
                'message': message
            }
        )

    def send_comment(self, comment):
        self.send(text_data=json.dumps(comment))

    def issue_comment(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))
