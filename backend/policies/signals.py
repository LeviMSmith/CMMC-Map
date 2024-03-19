from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import (
    Assessment,
    Assessment_Objective,
    Assessment_Objective_Form,
    Revision,
    Control,
    Policy,
)


@receiver(post_save, sender=Assessment)
def create_assessment_objective_forms(sender, instance, created, **kwargs):
    if created:  # Check if the instance was created, not just updated
        assessment_objectives = Assessment_Objective.objects.all()
        for objective in assessment_objectives:
            Assessment_Objective_Form.objects.create(
                assessment=instance, assessment_objective=objective, complete=False
            )


@receiver(post_save, sender=Revision)
def create_default_policies_for_revision(sender, instance, created, **kwargs):
    if created:  # Ensures this happens only upon creation, not update
        controls = Control.objects.all()
        for control in controls:
            Policy.objects.create(
                control=control,
                revision=instance,
            )
