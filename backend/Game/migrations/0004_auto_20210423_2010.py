# Generated by Django 3.1.7 on 2021-04-23 18:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Game', '0003_auto_20210423_1956'),
    ]

    operations = [
        migrations.AlterField(
            model_name='playergame',
            name='user_id',
            field=models.ForeignKey(blank=True, limit_choices_to={'is_instructor': False}, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='playerrole', to=settings.AUTH_USER_MODEL),
        ),
    ]
