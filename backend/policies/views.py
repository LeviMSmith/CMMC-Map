from rest_framework import generics
from .models import Revision, Assessment
from .serializers import RevisionSerializer, AssessmentSerializer


class RevisionListView(generics.ListAPIView):
    queryset = Revision.objects.all()
    serializer_class = RevisionSerializer


class AssessmentListView(generics.ListAPIView):
    queryset = Assessment.objects.all()
    serializer_class = AssessmentSerializer
