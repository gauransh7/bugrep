from django.urls import include, path
from rest_framework_nested import routers
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework.documentation import include_docs_urls
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Backend API')


router = routers.SimpleRouter()
router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'projects', views.ProjectViewSet)
router.register(r'issues', views.IssueViewSet)
router.register(r'comments', views.CommentViewSet)

users_router = routers.NestedSimpleRouter(router, r'users', lookup='members')
users_router.register(r'projects', views.ProjectViewSet, basename='users-projects')

projects_router = routers.NestedSimpleRouter(router, r'projects', lookup='project')
projects_router.register(r'issues', views.IssueViewSet, basename='projects-issues')

issues_router = routers.NestedSimpleRouter(router, r'issues', lookup='issue')
issues_router.register(r'comments', views.CommentViewSet, basename='issues-comments')

assigned_users_router = routers.NestedSimpleRouter(router, r'users', lookup='assigned_user')
assigned_users_router.register(r'assigned_issues', views.IssueViewSet, basename='users-assigned_issues')

reported_users_router = routers.NestedSimpleRouter(router, r'users', lookup='reported_user')
reported_users_router.register(r'reported_issues', views.IssueViewSet, basename='users-reported_issues')

your_issues_router = routers.NestedSimpleRouter(router, r'users', lookup='members')
your_issues_router.register(r'your_issues', views.IssueViewSet, basename='users-your_issues')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(users_router.urls)),
    path('', include(projects_router.urls)),
    path('', include(issues_router.urls)),
    path('', include(assigned_users_router.urls)),
    path('', include(reported_users_router.urls)),
    path('', include(your_issues_router.urls)),
    path('auth/user', views.UserAPI.as_view()),
    path('oauth_redirect/', views.get_user_data),
    path(r'docs/', include_docs_urls(title='Backend API')),
    path(r'swagger-docs/', schema_view),
]

