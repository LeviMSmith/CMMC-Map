import os
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin
from rest_framework import status, generics
from django.shortcuts import get_object_or_404
from django.db.models import Count
from django.http import Http404
from .models import Revision, Assessment, Section, Policy, Evidence
from .serializers import (
    RevisionSerializer,
    AssessmentSerializer,
    SectionSerializer,
    PolicySerializer,
    EvidenceSerializer,
)


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = "page_size"
    max_page_size = 100


class AllEvidenceListView(GenericAPIView, ListModelMixin):
    queryset = Evidence.objects.all()
    serializer_class = EvidenceSerializer
    pagination_class = StandardResultsSetPagination

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


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
        try:
            policies = Policy.objects.filter(revision__id=revision, control=control)
            evidence = Evidence.objects.filter(
                policy__in=policies, id=evidence_id
            ).first()

            if evidence:
                # Check how many policies are associated with this evidence
                policy_count = evidence.policy.count()

                # If the evidence is linked to more than the current policy
                if policy_count > 1:
                    # Remove the link between the evidence and the policy only
                    evidence.policy.remove(*policies)
                else:
                    # If only linked to the current policy, delete the file (if exists) and the evidence record
                    if evidence.file:
                        file_path = evidence.file.path
                        if os.path.isfile(file_path):
                            os.remove(file_path)
                    evidence.delete()

                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(
                    {"error": "Evidence not found."}, status=status.HTTP_404_NOT_FOUND
                )
        except Evidence.DoesNotExist:
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
