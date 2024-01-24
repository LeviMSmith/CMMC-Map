from django.contrib import admin

from .models import Major_Section, Minor_Section, Policy, Evidence, Assessment, Assessment_Objective, Revision

admin.site.register(Major_Section)
admin.site.register(Minor_Section)
admin.site.register(Assessment_Objective)
admin.site.register(Assessment)
admin.site.register(Revision)
