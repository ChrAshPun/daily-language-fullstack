# Generated by Django 4.1.2 on 2023-03-06 02:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spanishdict', '0012_rename_eng_translation_spanishword_eng_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spanishword',
            name='spa',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
