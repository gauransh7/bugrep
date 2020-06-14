from rest_framework.serializers import ModelSerializer, ReadOnlyField
from backend.models import User, Project, Issue, Comment
from taggit_serializer.serializers import TagListSerializerField, TaggitSerializer


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        # fields = ['id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'profile']
        fields = '__all__'


class ProjectSerializer(ModelSerializer):
    def update(self, instance, validated_data):
        validated_data.pop('user', None)
        validated_data.pop('date', None)
        return super().update(instance, validated_data)
    class Meta:
        model = Project
        fields = '__all__'


class IssueSerializer(ModelSerializer, TaggitSerializer):
    tags = TagListSerializerField()
    project_name = ReadOnlyField()
    reported_user_name = ReadOnlyField()
    members = ReadOnlyField()

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


class CommentSerilizer(ModelSerializer):
    def update(self, instance, validated_data):
        validated_data.pop('user', None)
        validated_data.pop('issue', None)
        validated_data.pop('description', None)
        validated_data.pop('date', None)
        return super().update(instance, validated_data)
    class Meta:
        model = Comment
        fields = '__all__'
