from django.urls import path
from .views import policies_portal

urlpatterns = [
    path("", policies_portal, name="index")
]
