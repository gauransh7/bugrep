from django.db import models
from django.contrib.auth.models import AbstractUser
from djrichtextfield.models import RichTextField
from taggit.managers import TaggableManager
from .managers import CustomUserManager
from django.utils.translation import ugettext_lazy as _

# Create your models here. 

class User(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    profile = models.ImageField(upload_to='./issue_media', null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class Project(models.Model):
    user = models.ForeignKey(User, related_name='project_user', on_delete=models.CASCADE, editable=False)
    name = models.CharField(max_length=100)
    wiki = RichTextField()
    date = models.DateTimeField(auto_now_add=True, editable=False)
    version = models.DecimalField(max_digits=4, decimal_places=2)
    members = models.ManyToManyField(User, related_name='member_user', null=True, blank=True)

    def __str__(self):
        return self.name


class Issue(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, editable=False)
    reported_user = models.ForeignKey(User, related_name='reported_user', on_delete=models.SET_NULL, null=True, editable=False)
    assigned_user = models.ForeignKey(User, related_name='assigned_user', on_delete=models.SET_NULL, null=True)
    by_user = models.ForeignKey(User, related_name='by_user', on_delete=models.SET_NULL, null=True)
    heading = models.CharField(max_length=100, editable=False)
    description = RichTextField(blank=True, null=True, editable=False)
    media = models.FileField(upload_to='./issue_media', null=True, blank=True, editable=False)
    tags = TaggableManager()
    date = models.DateTimeField(auto_now_add=True, editable=False)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.heading


class Comment(models.Model):
    user = models.ForeignKey(User, related_name='comment_user', on_delete=models.SET_NULL, null=True, editable=False)
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, editable=False)
    description = RichTextField()
    date = models.DateTimeField(auto_now_add=True, editable=False)
    likes = models.ManyToManyField(User, related_name='liked_user')

    def __str__(self):  # pylint: disable=invalid-str-returned
        return self.description  
