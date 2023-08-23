from rest_framework import permissions

class IsSuperUserOrReadOnly(permissions.BasePermission): # BasePermission is built-in

  def has_permission(self, request, view):
    if request.method == 'GET':
      return True
    else:
      return request.user.is_superuser