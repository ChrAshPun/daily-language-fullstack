from rest_framework import serializers
from spanishdict.models import SpanishWord, SpanishVerb
from itblog.models import Article, Instructions

class SpanishInfinitiveSerializer(serializers.ModelSerializer): 
  class Meta:
    model = SpanishVerb 
    fields = ('infinitive_spa',)

class SpanishVerbSerializer(serializers.ModelSerializer): 
  class Meta:
    model = SpanishVerb 
    fields = ('infinitive_spa', 'infinitive_eng', 'conjugated_spa', 'conjugated_eng', 'mood', 'tense', 'pronoun')

class SpanishWordSerializer(serializers.ModelSerializer): # convert Django model to JSON
  class Meta:
    model = SpanishWord 
    fields = ('spa', 'eng',)

class ITInstructionsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Instructions
    fields = ('objective', 'overview', 'steps', 'img_src', 'img_alt')

# nest serializers (one-to-many)
class ITArticleSerializer(serializers.ModelSerializer):
  # <model>_set - backwards relation to access related objects in a one-to-many or many-to-many relationship
  instructions = ITInstructionsSerializer(source="instructions_set", many=True) # wrap serialized data in a list

  class Meta:
    model = Article
    fields = ('category', 'title', 'notes', "instructions")