# Generated by Django 3.1.7 on 2021-04-27 12:50

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DemandPattern',
            fields=[
                ('demand_id', models.CharField(max_length=32, primary_key=True, serialize=False)),
                ('weeks_num', models.IntegerField()),
                ('demands', models.CharField(max_length=128, validators=[django.core.validators.int_list_validator])),
            ],
        ),
        migrations.CreateModel(
            name='Game',
            fields=[
                ('game_id', models.CharField(max_length=32, primary_key=True, serialize=False)),
                ('session_length', models.IntegerField(default=26)),
                ('distributor_present', models.BooleanField(default=True)),
                ('wholesaler_present', models.BooleanField(default=True)),
                ('holding_cost', models.FloatField(default=1)),
                ('backlog_cost', models.FloatField(default=1)),
                ('rounds_completed', models.IntegerField(default=0)),
                ('starting_inventory', models.IntegerField(default=0)),
                ('active_status', models.BooleanField(default=True)),
                ('info_sharing', models.BooleanField(default=False)),
                ('info_delay', models.IntegerField(default=2)),
            ],
        ),
        migrations.CreateModel(
            name='PlayerGame',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role_name', models.CharField(default='no-role', max_length=32)),
                ('order_status', models.BooleanField(default=False)),
                ('downstream_player', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='playergame_downstream_player', to='Game.playergame')),
                ('game_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='gameroles', to='Game.game')),
                ('upstream_player', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='playergame_upstream_player', to='Game.playergame')),
            ],
        ),
        migrations.CreateModel(
            name='Week',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('week_num', models.IntegerField(default=1, null=True)),
                ('inventory', models.IntegerField(default=0, null=True)),
                ('backlog', models.IntegerField(default=0, null=True)),
                ('demand', models.IntegerField(default=0, null=True)),
                ('incoming', models.IntegerField(default=0, null=True)),
                ('outgoing', models.IntegerField(default=0, null=True)),
                ('order', models.IntegerField(blank=True, default=None, null=True)),
                ('cost', models.IntegerField(default=0, null=True)),
                ('completed_status', models.BooleanField(default=False, null=True)),
                ('player_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='roleweeks', to='Game.playergame')),
            ],
        ),
    ]
