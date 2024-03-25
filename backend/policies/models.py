from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Section(models.Model):
    def __str__(self):
        return f"{self.id}"

    id = models.PositiveSmallIntegerField(primary_key=True)


class Control(models.Model):
    def __str__(self):
        return f"{self.id}"

    id = models.PositiveSmallIntegerField(primary_key=True)
    section = models.ForeignKey(
        Section, on_delete=models.SET_NULL, blank=True, null=True
    )


class Revision(models.Model):
    def __str__(self):
        return f"{self.version}"

    version = models.CharField(max_length=36, unique=True)
    date_completed = models.DateTimeField(null=True, blank=True)


class Policy(models.Model):
    def __str__(self):
        return f"${self.control} {self.revision} {self.id}"

    policy_description = models.TextField(null=True)
    plan_description = models.TextField(null=True)
    na_description = models.TextField(null=True)
    implementation_status = models.PositiveSmallIntegerField(default=0)
    control = models.ForeignKey(Control, on_delete=models.CASCADE)
    revision = models.ForeignKey(Revision, on_delete=models.CASCADE)


class Evidence(models.Model):
    image = models.ImageField(null=True)
    file = models.FileField(null=True)
    link = models.URLField(null=True)
    description = models.TextField(null=True)
    policy = models.ForeignKey(Policy, on_delete=models.CASCADE)


class Assessment(models.Model):
    def __str__(self):
        return f"{self.name}"

    name = models.CharField(max_length=255)
    started = models.DateTimeField(null=True)
    finished = models.DateTimeField(null=True, blank=True)
    revision = models.ForeignKey(Revision, on_delete=models.CASCADE)

    class Meta:
        unique_together = [["name", "revision"]]


class Assessment_Objective(models.Model):
    def __str__(self):
        return f"{self.control} {self.letter}"

    control = models.ForeignKey(Control, on_delete=models.CASCADE)
    letter = models.CharField(max_length=2)


class Assessment_Objective_Form(models.Model):
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE)
    assessment_objective = models.ForeignKey(
        Assessment_Objective, on_delete=models.CASCADE
    )
    complete = models.BooleanField(default=False)


class Assessment_Policy_Comment(models.Model):
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE)
    comment = models.TextField()
    policy = models.ForeignKey(Policy, on_delete=models.CASCADE)
