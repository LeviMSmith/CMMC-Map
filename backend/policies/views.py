import os
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin
from rest_framework import status, generics
from django.shortcuts import get_object_or_404
from django.db.models import Count
from django.http import Http404, JsonResponse
from django.conf import settings
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.backends import TokenBackend
from rest_framework_simplejwt.settings import api_settings
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
        # Pass 'context' with 'request' to the serializer
        serializer = EvidenceSerializer(
            evidence_list, many=True, context={"request": request}
        )
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

    def post(self, request, revision, control, evidence_id, format=None):
        # Find the policy based on revision and control
        policy = Policy.objects.filter(revision__id=revision, control=control).first()
        if not policy:
            return Response(
                {"error": "Policy not found."}, status=status.HTTP_404_NOT_FOUND
            )

        # Find the evidence by id
        try:
            evidence = Evidence.objects.get(id=evidence_id)
        except Evidence.DoesNotExist:
            return Response(
                {"error": "Evidence not found."}, status=status.HTTP_404_NOT_FOUND
            )

        # Add the evidence to the policy
        policy.evidence_set.add(evidence)

        return Response(
            {"success": "Evidence associated with the policy successfully."},
            status=status.HTTP_200_OK,
        )


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


class CookieTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        # Instead of returning tokens in the response body, set them as cookies
        response = Response("Login Successful")

        response.set_cookie(
            "access",
            serializer.validated_data["access"],
            httponly=True,
            secure=True,
            samesite="Strict",
        )
        response.set_cookie(
            "refresh",
            serializer.validated_data["refresh"],
            httponly=True,
            secure=True,
            samesite="Strict",
        )
        return response


class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refresh", None)
        if not refresh_token:
            return Response("Refresh token not found in cookies", status=400)

        request.data["refresh"] = refresh_token
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        # We don't need to set the refresh token again, just the access token
        response = Response("Access token refreshed successfully")

        response.set_cookie(
            "access",
            serializer.validated_data["access"],
            httponly=True,
            secure=True,
            samesite="Strict",
        )

        # Optionally, if you're also refreshing the refresh token itself, you'd set it here
        # This depends on your token refresh policy/strategy

        return response
