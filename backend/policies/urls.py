from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CookieTokenObtainPairView,
    RevisionListView,
    AssessmentListView,
    policy_status_by_section,
    PolicyUpdateAPIView,
    EvidenceListView,
    EvidenceDeleteView,
    AllEvidenceListView,
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
    path("evidence/", AllEvidenceListView.as_view(), name="all-evidence"),
    path("token/", CookieTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
