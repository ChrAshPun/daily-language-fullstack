# Generated by Django 4.1.2 on 2023-04-22 03:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('itblog', '0003_alter_article_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='created_on',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='article',
            name='updated_on',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]
