from django.db import models
from django.contrib.auth.models import AbstractUser
from djrichtextfield.models import RichTextField
from taggit.managers import TaggableManager
from .managers import CustomUserManager
from django.utils.translation import ugettext_lazy as _

# Create your models here. 

class User(AbstractUser):
    username = None
    password = None
    email = models.EmailField(_('email address'), unique=True)
    profile = models.URLField(null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    
    class Meta:
        ordering = ['first_name', 'last_name', 'pk']


class Project(models.Model):
    user = models.ForeignKey(User, related_name='project_user', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    wiki = RichTextField()
    date = models.DateTimeField(auto_now_add=True )
    version = models.DecimalField(max_digits=4, decimal_places=2)
    members = models.ManyToManyField(User, related_name='member_user')

    def __str__(self):
        return self.name


class Issue(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE )
    reported_user = models.ForeignKey(User, related_name='reported_user', on_delete=models.SET_NULL, null=True )
    assigned_user = models.ForeignKey(User, related_name='assigned_user', on_delete=models.SET_NULL, null=True)
    by_user = models.ForeignKey(User, related_name='by_user', on_delete=models.SET_NULL, null=True)
    heading = models.CharField(max_length=100 )
    description = RichTextField(blank=True, null=True )
    media = models.FileField(upload_to='./issue_media', null=True, blank=True)
    tags = TaggableManager()
    date = models.DateTimeField(auto_now_add=True )
    status = models.IntegerField(default=0)

    def __str__(self):
        return self.heading

    def project_name(self):
        return self.project.name

    def reported_user_name(self):
        if (self.reported_user != None):
            return self.reported_user.first_name + " " + self.reported_user.last_name
        else:
            return None

    def members(self):
        members = []
        for user in self.project.members.all():
            member = {}
            member['id'] = user.id
            member['name'] = user.first_name + ' ' + user.last_name
            member['profile'] = user.profile
            members.append(member)
        return members


    class Meta:
        ordering = ['-date', 'pk']


class Comment(models.Model):
    user = models.ForeignKey(User, related_name='comment_user', on_delete=models.SET_NULL, null=True )
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE )
    description = RichTextField()
    date = models.DateTimeField(auto_now_add=True )
    likes = models.ManyToManyField(User, related_name='liked_user')

    def __str__(self):  # pylint: disable=invalid-str-returned
        return self.description  
