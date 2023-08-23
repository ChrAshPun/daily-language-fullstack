from django.apps import AppConfig

class ITBlogConfig(AppConfig): # name to be imported into INSTALLED_APPS
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'itblog'
