from rest_framework import serializers
from .models import Revision, Assessment, Policy, Section, Control, Evidence


class EvidenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evidence
        fields = ["id", "file", "link", "description"]
        read_only_fields = ["id"]


class PolicySerializer(serializers.ModelSerializer):
    num_evidence = serializers.SerializerMethodField()

    class Meta:
        model = Policy
        fields = [
            "id",
            "policy_description",
            "plan_description",
            "na_description",
            "implementation_status",
            "control",
            "evidence_list",
            "num_evidence",
        ]
        read_only_fields = ("id", "control", "evidence_list", "num_evidence")

    def get_num_evidence(self, obj):
        if obj.evidence_list:
            return obj.evidence_list.evidences.count()
        return 0


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
        fields = "__all__"
        read_only_fields = [
            "id",
            "system_top_evi",
            "hardware_listing",
            "software_listing",
            "information_description",
        ]


class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = ["id", "name", "revision", "started", "finished"]
        read_only_fields = ["id"]
