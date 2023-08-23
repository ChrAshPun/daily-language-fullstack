from django.contrib import admin
from .models import SpanishWord, SpanishVerb

import csv
from django.http import HttpResponse

class ExportCsvMixin:
    def export_as_csv(self, request, queryset):

        meta = self.model._meta
        field_names = [field.name for field in meta.fields]

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename={}.csv'.format(meta)
        writer = csv.writer(response)

        writer.writerow(field_names)
        for obj in queryset:
            row = writer.writerow([getattr(obj, field) for field in field_names])

        return response

    export_as_csv.short_description = "Export Selected"

class SpanishWordAdmin(admin.ModelAdmin):
    list_display = [field.name for field in SpanishWord._meta.get_fields()]
    readonly_fields = ('created_on', 'updated_on')
    search_fields = ['spa', 'eng']

admin.site.register(SpanishWord, SpanishWordAdmin) # add to admin panel

class SpanishVerbAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = [field.name for field in SpanishVerb._meta.get_fields()]
    readonly_fields = ('created_on', 'updated_on')
    search_fields = ['infinitive_spa', 'conjugated_spa', 'conjugated_eng']
    actions = ["export_as_csv"]

admin.site.register(SpanishVerb, SpanishVerbAdmin) # add to admin panel