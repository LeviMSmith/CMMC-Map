from rest_framework import serializers
from .models import Revision, Assessment, Policy, Section, Control


class PolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = Policy
        fields = ["id", "description", "implementation_status", "control"]


class SectionSerializer(serializers.ModelSerializer):
    policies = serializers.SerializerMethodField()

    class Meta:
        model = Section
        fields = ["id", "policies"]

    def get_policies(self, obj):
        revision_id = self.context.get("revision_id")
        policies = Policy.objects.filter(
            control__section=obj, revision_id=revision_id
        ).select_related("control")
        return PolicySerializer(policies, many=True).data


class RevisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Revision
        fields = ["id", "version", "date_completed"]


class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = ["id", "name", "started", "finished"]
