from rest_framework import permissions
from . import models


class IsOwnerAdminorReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.is_superuser == True:
            return True
        
        try:
            if request.user in obj.project.members.all() or request.user == obj.project.user:
                return True
            user = obj.reported_user
        except:
            user = obj.user

        return request.user == user
        
