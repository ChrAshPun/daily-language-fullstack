from django.contrib import admin
from .models import Article
from .models import Instructions

class ArticleAdmin(admin.ModelAdmin):
    list_display = ['category', 'title', 'notes', 'created_on', 'updated_on']
    readonly_fields = ('created_on', 'updated_on')

admin.site.register(Article, ArticleAdmin) # add to admin panel

class InstructionsAdmin(admin.ModelAdmin):
    list_display = [ 'author', 'objective', 'overview', 'steps', 'img_src', 'img_alt' ]

admin.site.register(Instructions, InstructionsAdmin)
