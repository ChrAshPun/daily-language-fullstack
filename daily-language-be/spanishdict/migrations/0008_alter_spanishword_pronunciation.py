# Generated by Django 4.1.2 on 2023-01-04 04:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spanishdict', '0007_remove_spanishword_part_of_speech'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spanishword',
            name='pronunciation',
            field=models.CharField(blank=True, default='', max_length=50, null=True),
        ),
    ]
