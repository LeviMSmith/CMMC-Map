from rest_framework import serializers
from .models import Major_Section, Minor_Section


class MinorSectionBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Minor_Section
        fields = ['section', 'brief_description']


class MajorSectionSerializer(serializers.ModelSerializer):
    minorSections = MinorSectionBriefSerializer(
        source='minor_section_set', many=True)

    class Meta:
        model = Major_Section
        fields = ['section', 'title', 'minorSections']
