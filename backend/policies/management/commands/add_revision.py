from django.core.management.base.BaseCommand
from policies.models import Revision

class Command(BaseCommand):
    help = 'Adds a revision record if it does not already exist'

    def handle(self, *args, **kwargs):
        revision_id = 1
        version = "1.0"

        # Check if the record already exists
        if Revision.objects.filter(pk=revision_id).exists():
            self.stdout.write(self.style.WARNING(f"Record with pk {revision_id} already exists. Skipping."))
        else:
            # Create the record
            Revision.objects.create(pk=revision_id, version=version)
            self.stdout.write(self.style.SUCCESS(f"Record with pk {revision_id} created successfully."))
