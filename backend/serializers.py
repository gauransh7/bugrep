from rest_framework.serializers import ModelSerializer, ReadOnlyField
from backend.models import User, Project, Issue, Comment
from taggit_serializer.serializers import TagListSerializerField, TaggitSerializer


class UserSerializer(ModelSerializer):
    no_of_projects = ReadOnlyField()
    no_of_issues = ReadOnlyField()

    def update(self, instance, validated_data):
        validated_data.pop('email', None)
        validated_data.pop('first_name', None)
        validated_data.pop('last_name', None)
        validated_data.pop('profile', None)
        return super().update(instance, validated_data)

    class Meta:
        model = User
        # fields = ['id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'profile']
        fields = '__all__'


class ProjectSerializer(ModelSerializer):
    members_detail = ReadOnlyField()
    no_of_issues = ReadOnlyField()

    def update(self, instance, validated_data):
        validated_data.pop('user', None)
        validated_data.pop('date', None)
        return super().update(instance, validated_data)
    
    class Meta:
        model = Project
        fields = '__all__'


class IssueSerializer(ModelSerializer):
    project_name = ReadOnlyField()
    reported_user_name = ReadOnlyField()
    reported_user_profile = ReadOnlyField()
    members = ReadOnlyField()
    no_of_comments = ReadOnlyField()

    def update(self, instance, validated_data):
        validated_data.pop('heading', None)
        validated_data.pop('reported_user', None)
        validated_data.pop('project', None)
        validated_data.pop('description', None)
        validated_data.pop('tags', None)
        validated_data.pop('date', None)
        return super().update(instance, validated_data)
    class Meta:
        model = Issue
        fields = '__all__'


class CommentSerializer(ModelSerializer):
    def update(self, instance, validated_data):
        validated_data.pop('user', None)
        validated_data.pop('issue', None)
        validated_data.pop('description', None)
        validated_data.pop('date', None)
        return super().update(instance, validated_data)
    class Meta:
        model = Comment
        fields = '__all__'
