from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Revision, Assessment, Section
from .serializers import RevisionSerializer, AssessmentSerializer, SectionSerializer


@api_view(["GET"])
def policy_status_by_section(request, revision):
    sections = Section.objects.all()
    serializer = SectionSerializer(
        sections, many=True, context={"revision_id": revision}
    )
    return Response(serializer.data)


class RevisionListView(generics.ListAPIView):
    queryset = Revision.objects.all()
    serializer_class = RevisionSerializer


class AssessmentListView(generics.ListAPIView):
    serializer_class = AssessmentSerializer

    def get_queryset(self):
        revision_id = self.kwargs["revision"]
        return Assessment.objects.filter(revision_id=revision_id)
