from rest_framework import serializers
from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Project
        fields = '__all__'



class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Issue
        fields = '__all__'
