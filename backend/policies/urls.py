from django.urls import path
from .views import RevisionListView, AssessmentListView, policy_status_by_section

urlpatterns = [
    path("revisions/", RevisionListView.as_view(), name="revision-list"),
    path(
        "revisions/<int:revision>/assessments/",
        AssessmentListView.as_view(),
        name="assessment-list-for-revision",
    ),
    path(
        "revisions/<int:revision>/implementation_status/",
        policy_status_by_section,
        name="policy-status-by-section",
    ),
]
