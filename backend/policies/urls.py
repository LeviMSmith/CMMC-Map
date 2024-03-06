from django.urls import path
from .views import SectionListAPIView, MinorSectionDescListAPIView

urlpatterns = [
    path('api/sections/', SectionListAPIView.as_view(),
         name='major-sections-list'),
    path('api/sections/desc', MinorSectionDescListAPIView.as_view(),
         name="section-desc-list")
]
