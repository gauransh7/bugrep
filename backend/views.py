from . import models, serializers
from rest_framework import viewsets

# Create your views here.

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        try:
            return models.Project.objects.filter(user=self.kwargs['user_pk'])
        except KeyError:
            return models.Project.objects.all()
    queryset = models.Project.objects.all()
    serializer_class = serializers.ProjectSerializer


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
                    return models.Issue.objects.all()
    queryset = models.Issue.objects.all()
    serializer_class = serializers.IssueSerializer


class CommentViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        try:
            return models.Comment.objects.filter(issue=self.kwargs['issue_pk'])
        except KeyError:
            return models.Comment.objects.all()
    queryset = models.Comment.objects.all()
    serializer_class = serializers.CommentSerilizer
