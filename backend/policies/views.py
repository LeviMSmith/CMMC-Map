import os
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status, generics
from django.shortcuts import get_object_or_404
from django.db.models import Count
from django.http import Http404, JsonResponse, FileResponse
from django.conf import settings
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.backends import TokenBackend
from rest_framework_simplejwt.settings import api_settings
from .models import Revision, Assessment, Section, Policy, Evidence, EvidenceList
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


class EvidenceListView(ListModelMixin, GenericAPIView):
    queryset = Evidence.objects.all()
    serializer_class = EvidenceSerializer
    pagination_class = StandardResultsSetPagination

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class EvidenceCreateView(APIView):
    # Enable support for multipart/form-data requests
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, evidence_list_id):
        # Fetch the evidence list
        evidence_list = get_object_or_404(EvidenceList, id=evidence_list_id)
        # Get all evidences associated with the evidence list
        evidences = evidence_list.evidences.all()

        # Serialize the queryset
        serializer = EvidenceSerializer(evidences, many=True)
        return Response(serializer.data)

    def post(self, request, evidence_list_id):
        # Fetch the evidence list
        evidence_list = get_object_or_404(EvidenceList, id=evidence_list_id)

        # Deserialize the incoming data to an Evidence object
        serializer = EvidenceSerializer(data=request.data)
        if serializer.is_valid():
            # Save the new Evidence object
            evidence = serializer.save()

            # Associate the new evidence with the specified evidence list
            evidence_list.evidences.add(evidence)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Return error if the data isn't valid
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EvidenceDetailView(APIView):
    def delete(self, request, evidence_list_id, evidence_id, format=None):
        evidence_list = get_object_or_404(EvidenceList, id=evidence_list_id)
        evidence = get_object_or_404(Evidence, id=evidence_id)

        # Check how many EvidenceLists reference this Evidence
        if evidence.evidencelist_set.count() > 1:
            # Evidence is referenced in multiple lists, so only remove it from the current one
            evidence_list.evidences.remove(evidence)
            return Response(
                {"message": "Evidence removed from the list"},
                status=status.HTTP_204_NO_CONTENT,
            )
        else:
            # This is the only list referencing the Evidence, delete Evidence and its associated media
            if evidence.file:
                evidence.file.delete()  # Delete the file associated with this evidence
            evidence.delete()  # Delete the Evidence record itself
            return Response(
                {"message": "Evidence and associated media deleted"},
                status=status.HTTP_204_NO_CONTENT,
            )

    def post(self, request, evidence_list_id, evidence_id, format=None):
        evidence_list = get_object_or_404(EvidenceList, id=evidence_list_id)
        evidence = get_object_or_404(Evidence, id=evidence_id)

        # Check if the evidence is already in the list
        if evidence in evidence_list.evidences.all():
            return Response(
                {"message": "Evidence already in the list"},
                status=status.HTTP_409_CONFLICT,
            )

        # Add evidence to the list
        evidence_list.evidences.add(evidence)
        return Response(
            {"message": "Evidence added to the list"}, status=status.HTTP_201_CREATED
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


class RevisionDetailView(APIView):
    """
    Retrieve, update, or delete a revision instance.
    """

    def get(self, request, revision_id, format=None):
        revision = get_object_or_404(Revision, pk=revision_id)
        serializer = RevisionSerializer(revision)
        return Response(serializer.data)

    def put(self, request, revision_id, format=None):
        revision = get_object_or_404(Revision, pk=revision_id)
        serializer = RevisionSerializer(revision, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(request.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, revision_id, format=None):
        revision = get_object_or_404(Revision, pk=revision_id)
        revision.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class RevisionView(APIView):
    """
    List all revisions, or create a new revision.
    """

    def get(self, request, format=None):
        revisions = Revision.objects.all()
        serializer = RevisionSerializer(revisions, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        data = request.data
        based_on_id = data.get("based_on")

        if based_on_id:
            try:
                based_on_revision = Revision.objects.get(id=based_on_id)

                # Create new EvidenceLists with the same Evidence objects
                def clone_evidence_list(evidence_list):
                    if not evidence_list:
                        return None
                    new_evidence_list = EvidenceList.objects.create()
                    new_evidence_list.evidences.set(evidence_list.evidences.all())
                    new_evidence_list.save()
                    return new_evidence_list

                # Create a copy of the based_on_revision excluding certain fields
                new_revision_data = {
                    "version": data.get("version"),
                    "system_name": based_on_revision.system_name,
                    "system_category": based_on_revision.system_category,
                    "system_unique_id": based_on_revision.system_unique_id,
                    "responsible_org_name": based_on_revision.responsible_org_name,
                    "responsible_org_addr": based_on_revision.responsible_org_addr,
                    "responsible_org_phone": based_on_revision.responsible_org_phone,
                    "info_owner_name": based_on_revision.info_owner_name,
                    "info_owner_title": based_on_revision.info_owner_title,
                    "info_owner_addr": based_on_revision.info_owner_addr,
                    "info_owner_phone": based_on_revision.info_owner_phone,
                    "info_owner_email": based_on_revision.info_owner_email,
                    "sys_owner_name": based_on_revision.sys_owner_name,
                    "sys_owner_title": based_on_revision.sys_owner_title,
                    "sys_owner_addr": based_on_revision.sys_owner_addr,
                    "sys_owner_phone": based_on_revision.sys_owner_phone,
                    "sys_owner_email": based_on_revision.sys_owner_email,
                    "sys_sec_name": based_on_revision.sys_sec_name,
                    "sys_sec_title": based_on_revision.sys_sec_title,
                    "sys_sec_addr": based_on_revision.sys_sec_addr,
                    "sys_sec_phone": based_on_revision.sys_sec_phone,
                    "sys_sec_email": based_on_revision.sys_sec_email,
                    "system_description": based_on_revision.system_description,
                    "num_end_users": based_on_revision.num_end_users,
                    "num_admin_users": based_on_revision.num_admin_users,
                    "hardsoft_main": based_on_revision.hardsoft_main,
                    "based_on": based_on_revision.id,
                }
                # Merge the copied data with the new data
                new_revision_data.update(
                    {
                        k: v
                        for k, v in data.items()
                        if k
                        not in [
                            "version",
                            "id",
                            "date_completed",
                            "information_description",
                            "system_top_evi",
                            "hardware_listing",
                            "software_listing",
                        ]
                    }
                )
                serializer = RevisionSerializer(data=new_revision_data)

                if serializer.is_valid():
                    new_revision = serializer.save()

                    # Use the EvidenceLists created by the signal handler
                    new_revision.information_description = clone_evidence_list(
                        based_on_revision.information_description
                    )
                    new_revision.system_top_evi = clone_evidence_list(
                        based_on_revision.system_top_evi
                    )
                    new_revision.hardware_listing = clone_evidence_list(
                        based_on_revision.hardware_listing
                    )
                    new_revision.software_listing = clone_evidence_list(
                        based_on_revision.software_listing
                    )
                    new_revision.save()

                    # Fetch the policies created by the signal handler
                    new_policies = Policy.objects.filter(revision=new_revision)

                    # Update the evidence_list of each new policy
                    based_on_policies = Policy.objects.filter(
                        revision=based_on_revision
                    )
                    for new_policy, based_on_policy in zip(
                        new_policies, based_on_policies
                    ):
                        new_policy.policy_description = (
                            based_on_policy.policy_description
                        )
                        new_policy.plan_description = based_on_policy.plan_description
                        new_policy.na_description = based_on_policy.na_description
                        new_policy.implementation_status = (
                            based_on_policy.implementation_status
                        )
                        new_policy.evidence_list = clone_evidence_list(
                            based_on_policy.evidence_list
                        )
                        new_policy.save()

                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Revision.DoesNotExist:
                return Response(
                    {"error": "Based on revision not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            serializer = RevisionSerializer(data=data)

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
