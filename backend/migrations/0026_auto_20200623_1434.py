# Generated by Django 3.0.5 on 2020-06-23 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0025_auto_20200623_1432'),
    ]

    operations = [
        migrations.AlterField(
            model_name='issue',
            name='media',
            field=models.FileField(blank=True, null=True, upload_to='./media/issue_media'),
        ),
        migrations.AlterField(
            model_name='project',
            name='logo',
            field=models.ImageField(null=True, upload_to='./media/project_media/logo'),
        ),
    ]
