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
from django.http import Http404, JsonResponse, FileResponse
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


# This isn't a super reccommended way to serve media since it's a bit slower
# than nginx, but it protects the media with the same authentication as the
# other routes.
class ServeProtectedMediaView(APIView):
    """
    Serve media files to users who meet the authentication and permission requirements.
    """

    def get(self, request, path, format=None):
        file_path = os.path.join(settings.MEDIA_ROOT, path)
        if os.path.exists(file_path):
            return FileResponse(open(file_path, "rb"))
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


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


class RevisionView(APIView):
    """
    List all revisions, or create a new revision.
    """

    def get(self, request, format=None):
        revisions = Revision.objects.all()
        serializer = RevisionSerializer(revisions, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = RevisionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AssessmentView(APIView):
    """
    List all assessments for a specific revision, or create a new assessment.
    """

    def get(self, request, revision_id, format=None):
        assessments = Assessment.objects.filter(revision_id=revision_id)
        serializer = AssessmentSerializer(assessments, many=True)
        return Response(serializer.data)

    def post(self, request, revision_id, format=None):
        # Update the request data with the revision_id
        modified_data = request.data.copy()  # Create a mutable copy of the request data
        modified_data["revision"] = int(revision_id)

        serializer = AssessmentSerializer(data=modified_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


class CookieTokenLogoutView(APIView):
    def post(self, request, *args, **kwargs):
        # Prepare a simple JSON response
        response = JsonResponse({"detail": "Logout successful"})

        # Clear the access token cookie by setting its value to an empty string
        # and its max_age to 0 to immediately expire it
        response.delete_cookie(
            "access",
            path="/",
            samesite="Strict",
        )

        # Do the same for the refresh token cookie
        response.delete_cookie(
            "refresh",
            path="/",
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
