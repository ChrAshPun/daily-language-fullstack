# Generated by Django 4.1.2 on 2023-01-03 23:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spanishdict', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spanishword',
            name='primary_eng_translation',
            field=models.CharField(max_length=50),
        ),
    ]
