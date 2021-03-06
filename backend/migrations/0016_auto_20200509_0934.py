# Generated by Django 3.0.5 on 2020-05-09 09:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import djrichtextfield.models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0015_auto_20200508_1235'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='issue',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Issue'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='comment_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='issue',
            name='description',
            field=djrichtextfield.models.RichTextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='issue',
            name='heading',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='issue',
            name='media',
            field=models.FileField(blank=True, null=True, upload_to='./issue_media'),
        ),
        migrations.AlterField(
            model_name='issue',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Project'),
        ),
        migrations.AlterField(
            model_name='issue',
            name='reported_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='reported_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='project',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='project_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
