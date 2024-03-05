from rest_framework.generics import ListAPIView
from .models import Major_Section
from .serializers import MajorSectionSerializer


class SectionListAPIView(ListAPIView):
    queryset = Major_Section.objects.all()
    serializer_class = MajorSectionSerializer
