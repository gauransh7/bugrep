# Generated by Django 3.0.5 on 2020-05-08 12:35

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0013_auto_20200508_1132'),
    ]

    operations = [
        migrations.AlterField(
            model_name='issue',
            name='media',
            field=models.FileField(blank=True, editable=False, null=True, upload_to='./issue_media'),
        ),
        migrations.AlterField(
            model_name='project',
            name='members',
            field=models.ManyToManyField(null=True, related_name='member_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
