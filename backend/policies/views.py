from rest_framework.generics import ListAPIView
from .models import Major_Section, Minor_Section
from .serializers import MajorSectionSerializer, MinorSectionDescSerializer


class SectionListAPIView(ListAPIView):
    queryset = Major_Section.objects.all()
    serializer_class = MajorSectionSerializer


class MinorSectionDescListAPIView(ListAPIView):
    queryset = Minor_Section.objects.all()
    serializer_class = MinorSectionDescSerializer
