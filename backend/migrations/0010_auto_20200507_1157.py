# Generated by Django 3.0.5 on 2020-05-07 11:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0009_auto_20200506_1423'),
    ]

    operations = [
        migrations.AlterField(
            model_name='issue',
            name='media',
            field=models.FileField(blank=True, null=True, upload_to='./issue_media'),
        ),
    ]
