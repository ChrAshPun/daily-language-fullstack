from django.db import models

class Article(models.Model):
  category = models.CharField(max_length=50)
  title = models.CharField(max_length=100)
  notes = models.CharField(max_length=2000, default="", blank=True) # strings separated by ','
  created_on = models.DateTimeField(auto_now_add=True)
  updated_on = models.DateTimeField(auto_now=True)

  # if I don't add this, admin page will say: Post object(1) instead of the title
  def __str__(self):
    return self.title

# Sqlite does not support ArrayField 
# one-to-many relationship - an article can have multiple instructions
class Instructions(models.Model):
  author = models.ForeignKey(Article, on_delete=models.CASCADE) #  when the referenced object is deleted, cascade
  objective = models.CharField(max_length=100)
  overview = models.CharField(max_length=2000)
  steps = models.CharField(max_length=2000) # strings separated by ','
  img_src = models.CharField(max_length=50, default="", blank=True)
  img_alt = models.CharField(max_length=50, default="", blank=True)

  def __str__(self):
    return self.objective

  class Meta:
    verbose_name_plural = "Instructions" # model name displayed on admin page