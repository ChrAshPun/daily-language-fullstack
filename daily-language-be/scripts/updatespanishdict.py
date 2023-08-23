import sqlite3
from datetime import datetime

# objective: insert multiple rows in the 'itblog_article' datatable using a .py script 
# to save time instead of using the admin GUI

conn = sqlite3.connect('/Users/christinapunla/Documents/Portfolio Projects/spanish-app/backend-django/db.sqlite3')
c = conn.cursor()

datatable = 'spanishdict_spanishverb'

# create a datetime object for the current time (created_on and updated_on cannot be null)
now = datetime.now()

'infinitive_spa, infinitive_eng, conjugated_spa, conjugated_eng, mood, tense, pronoun, created_on, updated_on'

records = [
  ('pedir', 'to ask for, to order', 'pido', 'I ask', 'Indicative', 'Present', 'yo', now, now),
  ('pedir', 'to ask for, to order', 'pedí', 'I asked', 'Indicative', 'Preterite', 'yo', now, now),
  ('pedir', 'to ask for, to order', 'pedía', 'I was asking', 'Indicative', 'Imperfect', 'yo', now, now),
  ('pedir', 'to ask for, to order', 'pediría', 'I would ask', 'Indicative', 'Conditional', 'yo', now, now),
  ('pedir', 'to ask for, to order', 'pediré', 'I will ask', 'Indicative', 'Future', 'yo', now, now),

  ('pedir', 'to ask for, to order', 'pides', 'you ask', 'Indicative', 'Present', 'tú', now, now),
  ('pedir', 'to ask for, to order', 'pediste', 'you asked', 'Indicative', 'Preterite', 'tú', now, now),
  ('pedir', 'to ask for, to order', 'pedías', 'you were asking', 'Indicative', 'Imperfect', 'tú', now, now),
  ('pedir', 'to ask for, to order', 'pedirías', 'you would ask', 'Indicative', 'Conditional', 'tú', now, now),
  ('pedir', 'to ask for, to order', 'pedirás', 'you will ask', 'Indicative', 'Future', 'tú', now, now),

  ('pedir', 'to ask for, to order', 'pide', 'he/she asks', 'Indicative', 'Present', 'él/ella/usted', now, now),
  ('pedir', 'to ask for, to order', 'pidió', 'he/she asked', 'Indicative', 'Preterite', 'él/ella/usted', now, now),
  ('pedir', 'to ask for, to order', 'pedía', 'he/she was asking', 'Indicative', 'Imperfect', 'él/ella/usted', now, now),
  ('pedir', 'to ask for, to order', 'pediría', 'he/she would ask', 'Indicative', 'Conditional', 'él/ella/usted', now, now),
  ('pedir', 'to ask for, to order', 'pedirá', 'he/she will ask', 'Indicative', 'Future', 'él/ella/usted', now, now),
]

# (test a single insert) c.execute(f'INSERT INTO {datatable} (category, title, notes, created_on, updated_on) VALUES (?,?,?,?,?);', record)

# insert multiple records in a single query
c.executemany(f'INSERT INTO {datatable} (infinitive_spa, infinitive_eng, conjugated_spa, conjugated_eng, mood, tense, pronoun, created_on, updated_on) VALUES (?,?,?,?,?,?,?,?,?);', records)

print('Inserted', c.rowcount, 'records to the table.')

#commit the changes to db			
conn.commit()

#close the connection
conn.close()
