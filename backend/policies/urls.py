from django.urls import path
from .views import RevisionListView, AssessmentListView

urlpatterns = [
    path("revisions/", RevisionListView.as_view(), name="revision-list"),
    path("assessments/", AssessmentListView.as_view(), name="assessment-list"),
]
