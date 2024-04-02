from django.urls import path
from .views import (
    RevisionListView,
    AssessmentListView,
    policy_status_by_section,
    PolicyUpdateAPIView,
    EvidenceListView,
    EvidenceDeleteView,
)

urlpatterns = [
    path("revisions/", RevisionListView.as_view(), name="revision-list"),
    path(
        "revisions/<int:revision>/assessments/",
        AssessmentListView.as_view(),
        name="assessment-list-for-revision",
    ),
    path(
        "revisions/<int:revision>/policy/",
        policy_status_by_section,
        name="policy-status-by-section",
    ),
    path(
        "revisions/<int:revision>/policy/<int:control>/",
        PolicyUpdateAPIView.as_view(),
        name="update_policy_api",
    ),
    path(
        "revisions/<int:revision>/policy/<int:control>/evidence/",
        EvidenceListView.as_view(),
        name="evidence-list",
    ),
    path(
        "revisions/<int:revision>/policy/<int:control>/evidence/<int:evidence_id>/",
        EvidenceDeleteView.as_view(),
        name="evidence-delete",
    ),
]
