# Generated by Django 2.0 on 2018-10-15 13:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('abstract_user', '0002_profile'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='profile',
            options={'ordering': ('user',)},
        ),
    ]
