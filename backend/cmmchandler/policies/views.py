from django.shortcuts import render
from .models import Major_Section, Minor_Section, Revision, Assessment


def policies_portal(request):
    major_sections = Major_Section.objects.all()
    revisions = Revision.objects.all()
    assessments = Assessment.objects.all()
    return render(request, 'policies/index.html', {
        'major_sections': major_sections,
        'revisions': revisions,
        'assessments': assessments
    })
