# Generated by Django 3.0.5 on 2020-05-03 11:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_auto_20200503_1118'),
    ]

    operations = [
        migrations.AlterField(
            model_name='media',
            name='media',
            field=models.FileField(null=True, upload_to='./issue_media'),
        ),
    ]
