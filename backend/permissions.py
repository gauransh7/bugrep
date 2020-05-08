from rest_framework import permissions


class IsOwnerAdminorReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.is_superuser == True:
            return True
        
        try:
            user = obj.assigned_user
        except AttributeError:
            user = obj.user

        return request.user == user

