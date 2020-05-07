from rest_framework.serializers import ModelSerializer
from backend.models import User, Project, Issue, Comment


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        # fields = ['id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'profile']
        fields = '__all__'


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class IssueSerializer(ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'


class CommentSerilizer(ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'