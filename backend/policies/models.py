from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Major_Section(models.Model):
    def __str__(self):
        return (f"{self.section} {self.title}")
    section = models.CharField(max_length=20)
    title = models.CharField(max_length=255)


class Minor_Section(models.Model):
    def __str__(self):
        return (f"{self.section}")
    section = models.CharField(max_length=30)
    brief_description = models.TextField()
    examine = models.TextField()
    interview = models.TextField()
    test = models.TextField()
    detailed_description = models.TextField()
    further_discussion = models.TextField()
    major_section = models.ForeignKey(Major_Section, on_delete=models.CASCADE)


class Revision(models.Model):
    def __str__(self):
        return (f"{self.version}")

    version = models.CharField(max_length=30)
    date_completed = models.DateTimeField(null=True, blank=True)


class Policy(models.Model):
    def __str__(self):
        return (f"${self.minor_section} {self.id}")
    description = models.TextField()
    implementation_status = models.CharField(max_length=2, default="N")
    minor_section = models.ForeignKey(
        Minor_Section, on_delete=models.SET_NULL, null=True)
    revision = models.ForeignKey(Revision, on_delete=models.CASCADE)


class Evidence(models.Model):
    image = models.ImageField(null=True)
    file = models.FileField(null=True)
    link = models.URLField(null=True)
    description = models.TextField()
    policy = models.ForeignKey(Policy, on_delete=models.CASCADE)


class Assessment(models.Model):
    def __str__(self):
        return (f"{self.name}")

    name = models.CharField(max_length=255)
    started = models.DateTimeField(null=True)
    finished = models.DateTimeField(null=True, blank=True)
    revision = models.ForeignKey(Revision, on_delete=models.CASCADE)


class Assessment_Objective(models.Model):
    def __str__(self):
        return (f"{self.minor_section} {self.letter}")

    letter = models.CharField(max_length=3)
    description = models.TextField()
    minor_section = models.ForeignKey(
        Minor_Section, on_delete=models.CASCADE)


class Assessment_Objective_Form(models.Model):
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE)
    assessment_objective = models.ForeignKey(
        Assessment_Objective, on_delete=models.CASCADE)
    complete = models.BooleanField(default=False)
