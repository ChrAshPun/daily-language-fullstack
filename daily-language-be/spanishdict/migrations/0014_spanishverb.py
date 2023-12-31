# Generated by Django 4.1.2 on 2023-07-11 05:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spanishdict', '0013_alter_spanishword_spa'),
    ]

    operations = [
        migrations.CreateModel(
            name='SpanishVerb',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('infinitive_spa', models.CharField(max_length=50)),
                ('infinitive_eng', models.CharField(max_length=50)),
                ('conjugated_spa', models.CharField(max_length=50, unique=True)),
                ('conjugated_eng', models.CharField(max_length=50)),
                ('mood', models.CharField(max_length=50)),
                ('tense', models.CharField(max_length=50)),
                ('pronoun', models.CharField(max_length=50)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('updated_on', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
