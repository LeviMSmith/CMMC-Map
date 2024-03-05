from django.urls import path
from .views import SectionListAPIView

urlpatterns = [
    path('api/sections/', SectionListAPIView.as_view(),
         name='major-sections-list'),
]
