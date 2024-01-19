from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Major_Section(models.Model):
    section = models.CharField(max_length=20)
    title = models.CharField(max_length=255)


class Minor_Section(models.Model):
    section = models.CharField(max_length=30)
    brief_description = models.TextField()
    detailed_description = models.TextField()
    major_section = models.ForeignKey(Major_Section, on_delete=models.CASCADE)


class Policy(models.Model):
    description = models.TextField()
    minor_section = models.ForeignKey(Minor_Section, on_delete=models.SET_NULL)
    modified_date = models.DateTimeField(null=True)
    modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)


class Evidence(models.Model):
    image = models.ImageField(null=True)
    file = models.FileField(null=True)
    link = models.URLField(null=True)
    description = models.TextField()
    added_date = models.DateTimeField()
    modified_date = models.DateTimeField(null=True)
    modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
