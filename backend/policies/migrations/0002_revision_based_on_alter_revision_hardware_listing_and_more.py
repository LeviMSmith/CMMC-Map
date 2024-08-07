# Generated by Django 5.0.7 on 2024-07-11 22:07

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('policies', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='revision',
            name='based_on',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='policies.revision'),
        ),
        migrations.AlterField(
            model_name='revision',
            name='hardware_listing',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='revisions_for_hardware_listing', to='policies.evidencelist'),
        ),
        migrations.AlterField(
            model_name='revision',
            name='information_description',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='revisions_for_information_description', to='policies.evidencelist'),
        ),
        migrations.AlterField(
            model_name='revision',
            name='software_listing',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='revisions_for_software_listing', to='policies.evidencelist'),
        ),
        migrations.AlterField(
            model_name='revision',
            name='system_top_evi',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='revisions_for_system_top_evi', to='policies.evidencelist'),
        ),
    ]
