# Generated by Django 3.0.5 on 2020-05-04 13:34

import backend.managers
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0007_auto_20200503_1237'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='user',
            managers=[
                ('objects', backend.managers.CustomUserManager()),
            ],
        ),
        migrations.AddField(
            model_name='issue',
            name='media',
            field=models.FileField(null=True, upload_to='./issue_media'),
        ),
        migrations.DeleteModel(
            name='media',
        ),
    ]