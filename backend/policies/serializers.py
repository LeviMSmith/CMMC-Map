from rest_framework import serializers
from .models import Revision, Assessment


class RevisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Revision
        fields = ["id", "version", "date_completed"]


class AssessmentSerializer(serializers.ModelSerializer):
    revision = RevisionSerializer(read_only=True)

    class Meta:
        model = Assessment
        fields = ["id", "name", "started", "finished", "revision"]
