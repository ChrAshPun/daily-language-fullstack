import sqlite3
from datetime import datetime

# objective: insert multiple rows in the 'itblog_article' datatable using a .py script 
# to save time instead of using the admin GUI

conn = sqlite3.connect('./db.sqlite3')
c = conn.cursor()

datatable = 'itblog_article'

# create a datetime object for the current time (created_on and updated_on cannot be null)
now = datetime.now()

records = [
  ('Printers', 'My printer is randomly printing pages', '', now, now),
  ('Printers', 'My printer is printing a crazy symbols!', '', now, now),
  ('Outlook', 'Error: "The set of folders cannot be opened."', '', now, now),
  ('Outlook', 'Error: "Library not registered."', '', now, now),
  ('Outlook', 'Error: "Instant Search is not available when Outlook is running with administrator permissions."', '', now, now),
  ('Powerpoint', "I can\'t open Powerpoint attachments from Outlook.", '', now, now),
  ('Active Directory', 'I\'m locked out of my desktop! I can\'t sign in.', '', now, now),
  ('Exchange', 
  'How To Customize Mailbox Size', 
  '''Issue a warning at(GB): sets the maximum storage limits before the user receives a warning,
  Prohibit send at(GB): prevents the user from sending once the limit is reached,
  Prohibit send and receive at(GB): prevents the user from sending or receiving email once the limit is reached.''', 
  now, now),
  ('Exchange', 'How To Create A Retention Policy', '', now, now)
]

# (test a single insert) c.execute(f'INSERT INTO {datatable} (category, title, notes, created_on, updated_on) VALUES (?,?,?,?,?);', record)

# insert multiple records in a single query
c.executemany(f'INSERT INTO {datatable} (category, title, notes, created_on, updated_on) VALUES (?,?,?,?,?);', records)

print('Inserted', c.rowcount, 'records to the table.')

#commit the changes to db			
conn.commit()

#close the connection
conn.close()