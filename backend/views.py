from . import models, serializers
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from .permissions import IsOwnerAdminorReadOnly, IsAdminorReadOnly
import requests
from django.http import HttpResponse, JsonResponse
import json
from .models import User
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.shortcuts import render, redirect
import datetime
from rest_framework import generics
from itertools import chain
from django.core.mail import send_mail
from .models import User

class UserViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [IsAdminorReadOnly]
    # permission_classes = [AllowAny]


class ProjectViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        try:
            return models.Project.objects.filter(members=self.kwargs['members_pk'])
        except KeyError:
            return models.Project.objects.all()
    queryset = models.Project.objects.all()
    serializer_class = serializers.ProjectSerializer
    permission_classes = [IsOwnerAdminorReadOnly]
    # permission_classes = [AllowAny]

    def create(self, request):
        send_mail(
            'New Project for testing',
            request.data['name'] + ' is up for testing. \nReport the bugs to BugRep. \n',
            User.objects.get(pk=request.data['user']).email,
            list(map(lambda x: x.email, User.objects.all())),
        )
        return super().create(request)


class IssueViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        try:
            return models.Issue.objects.filter(project=self.kwargs['project_pk'])
        except KeyError:
            try:
                return models.Issue.objects.filter(assigned_user=self.kwargs['assigned_user_pk'])
            except KeyError:
                try:
                    return models.Issue.objects.filter(reported_user=self.kwargs['reported_user_pk'])
                except KeyError:
                    try:
                        projects = models.Project.objects.filter(members=self.kwargs['members_pk'])
                        if(len(projects)==0):
                            return None
                        issues = models.Issue.objects.all()
                        final = {}
                        for p in projects:
                            add = issues.filter(project=p)
                            final = sorted(
                                chain(final, add),
                                key = lambda instance: instance.id
                            )
                        return reversed(final)
                    except KeyError:
                        return models.Issue.objects.all()
    queryset = models.Issue.objects.all()
    serializer_class = serializers.IssueSerializer
    permission_classes = [IsOwnerAdminorReadOnly]
    # permission_classes = [AllowAny]


class CommentViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        try:
            return models.Comment.objects.filter(issue=self.kwargs['issue_pk'])
        except KeyError:
            return models.Comment.objects.all()
    queryset = models.Comment.objects.all()
    serializer_class = serializers.CommentSerializer
    permission_classes = [IsOwnerAdminorReadOnly]


def get_user_data(request):
    code = request.GET.get('code')
    token_data = {
        "client_id": "X3OuYZR7Gnmy6o3tiAhpIAmVI1fUdSjgSDXiS6q0",
        "client_secret": "v09gzijJXOGEDiKj7KPi8oVKCVLBCstW5aOoiZSLtedug5htBbD364nCyEYekWewnC8ba2msQ3uY9TB0mJMcl84gSovkWKzyBqeqxh0dzCrRI9u8yCoXaA1bRHN6gFuU",
        "grant_type": "authorization_code",
        "redirect_url": "http://127.0.0.1:8000/backend/oauth_user_data/",
        "code": code
    }
    response = requests.post(
        'https://internet.channeli.in/open_auth/token/', data=token_data).json()
    access_token = response['access_token']
    user_data = requests.get('https://internet.channeli.in/open_auth/get_user_data/',
                             headers={'Authorization': 'Bearer ' + access_token}).json()
    try:
        role = user_data['person']['roles'][1]['role']
        # status = user_data['person']['roles'][1]['activeStatus']
        email = user_data['contactInformation']['instituteWebmailAddress']
        try:
            user = User.objects.get(email=email)
            status = 'old'
            # return HttpResponse("<h1>Already There</h1>")
        except:
            name = user_data['person']['fullName'].split(" ", 1)
            first_name = name[0]
            last_name = name[1]
            image = 'https://internet.channeli.in/'+user_data['person']['displayPicture']
            user = User(email=email, first_name=first_name, last_name=last_name, profile=image)
            user.save()
            status = 'new'
            # return HttpResponse("<h1>Saved Successfully</h1>")

        token, created = Token.objects.get_or_create(user=user)

        if not created:
            token.save()

        data = JsonResponse({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'status': status
        })
        return redirect('http://localhost:3000/token/?token='+token.key)
    except IndexError:
        return HttpResponse("<h1>You don't have access, Go Away!!</h1>")
  
    
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated,]
    serializer_class = serializers.UserSerializer

    def get_object(self):
        return self.request.user
