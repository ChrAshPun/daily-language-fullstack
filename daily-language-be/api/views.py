import random
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from spanishdict.models import SpanishWord, SpanishVerb
from itblog.models import Article
from .serializers import SpanishWordSerializer, SpanishVerbSerializer, SpanishInfinitiveSerializer, ITArticleSerializer
from .permissions import IsSuperUserOrReadOnly
from django.db.models import F

class SpanishInfinitiveList(APIView):
  permission_classes = (IsSuperUserOrReadOnly,)

  def get(self, request, format=None):
    spa_infinitives = SpanishVerb.objects.order_by(F('infinitive_spa')).values('infinitive_spa').distinct()
    infinitives_list = [item["infinitive_spa"] for item in spa_infinitives]

    return Response(infinitives_list, status=status.HTTP_200_OK)

class SpanishVerbList(APIView): # my own basic view
  permission_classes = (IsSuperUserOrReadOnly,)

  def get(self, request, format=None):
    if (request.GET.get('filterby')):
      infinitive = request.GET["filterby"]
      if (infinitive == "any"):
        spanishverbs = SpanishVerb.objects.order_by('?')[:12]
      else:
        spanishverbs = SpanishVerb.objects.filter(infinitive_spa=infinitive)
    else:
      spanishverbs = SpanishVerb.objects.all()

    serializer = SpanishVerbSerializer(spanishverbs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

class SpanishWordList(APIView): # my own basic view
  permission_classes = (IsSuperUserOrReadOnly,)

  def get(self, request, format=None):
    if (request.GET.get('sample')):
      query_size = int(request.GET["sample"])
      spanishwords = SpanishWord.objects.all().order_by('?')[:query_size]
    else:
      spanishwords = SpanishWord.objects.all()
    serializer = SpanishWordSerializer(spanishwords, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

  def post(self, request, format=None):
    serializer = SpanishWordSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ITArticleList(APIView):
  permission_classes = (IsSuperUserOrReadOnly,)

  def get(self, request, format=None):
    # articles = Article.objects.all() # it will include related objects by default but query not efficient

    # tried to change img_src to imgSrc but it's not changing
    # articles = Article.objects.all().prefetch_related(
    #   Prefetch(
    #     'instructions_set', 
    #     queryset=Instructions.objects.all().annotate(imgSrc=F('img_src'))
    #   )
    # )

    # <model>_set - backwards relation to access related objects in a one-to-many or many-to-many relationship
    articles = Article.objects.prefetch_related('instructions_set').all() # fetch all related objects in a single query

    serializer = ITArticleSerializer(articles, many=True) # serialize first, then can access article['instructions']
    for article in serializer.data:
      if article['notes'] != "": # notes is optional
        article['notes'] = article['notes'].split(',') # convert to arrays of strings
      for instruction in article['instructions']: # required for all articles
        instruction['steps'] = instruction['steps'].split(',') # convert to arrays of strings
        instruction['imgSrc'] = instruction['img_src'] # change img_src to imgSrc (for React naming convention)
        del instruction['img_src']
        instruction['imgAlt'] = instruction['img_alt'] # change img_alt to imgAlt (for React naming convention)
        del instruction['img_alt']

    return Response(serializer.data, status=status.HTTP_200_OK)