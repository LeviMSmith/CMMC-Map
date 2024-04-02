from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework import status, generics
from django.shortcuts import get_object_or_404
from .models import Revision, Assessment, Section, Policy, Evidence
from .serializers import (
    RevisionSerializer,
    AssessmentSerializer,
    SectionSerializer,
    PolicySerializer,
    EvidenceSerializer,
)


class EvidenceListView(APIView):
    def get(self, request, revision, control, format=None):
        policies = Policy.objects.filter(revision__id=revision, control=control)
        evidence_list = Evidence.objects.filter(policy__in=policies).distinct()
        serializer = EvidenceSerializer(evidence_list, many=True)
        return Response(serializer.data)

    def post(self, request, revision, control, format=None):
        serializer = EvidenceSerializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer, revision, control)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer, revision, control):
        # Find the policy based on revision and control
        policy = Policy.objects.filter(revision__id=revision, control=control).first()
        if not policy:
            raise ValidationError(
                f"Policy not found with the provided revision {revision} and control {control}."
            )
        evidence = serializer.save()
        evidence.policy.add(policy)


class EvidenceDeleteView(APIView):
    def delete(self, request, revision, control, evidence_id, format=None):
        print("Hello?")
        try:
            # Retrieve the specific evidence item to be deleted.
            # Assuming `evidence_id` is passed in the URL to this view.
            policies = Policy.objects.filter(revision__id=revision, control=control)
            print(f"Policies that match: {len(policies)}")
            evidence = Evidence.objects.filter(
                policy__in=policies, id=evidence_id
            ).first()
            if evidence:
                evidence.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(
                    {"error": "Evidence not found."}, status=status.HTTP_404_NOT_FOUND
                )
        except Evidence.DoesNotExist:
            # If no evidence found with the provided ID
            raise Http404


class PolicyUpdateAPIView(APIView):
    def post(self, request, revision, control):
        policy = get_object_or_404(Policy, revision_id=revision, control_id=control)
        serializer = PolicySerializer(policy, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
