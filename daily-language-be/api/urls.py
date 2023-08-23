from django.urls import path
from .views import SpanishWordList, SpanishVerbList, SpanishInfinitiveList, ITArticleList

urlpatterns = [
    path('spanishdict/', SpanishWordList.as_view()),
    path('spanishverbs/', SpanishVerbList.as_view()),
    path('spanishinfinitives/', SpanishInfinitiveList.as_view()),
    path('itarticles/', ITArticleList.as_view()),
]