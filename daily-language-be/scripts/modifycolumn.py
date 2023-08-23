import sqlite3

# Objective: edit a single column in the itblog_article datatable using a .py script 
# I need to remove the '.' prefix for all rows in img_src column

connect = sqlite3.connect('./db.sqlite3')
c = connect.cursor()

datatable = 'itblog_instructions'

# <> operator means "not equal to"
c.execute(f"UPDATE {datatable} SET img_src = SUBSTR(img_src, 2) WHERE img_src <> ''")
print(f'Updated {c.rowcount} records to the {datatable}.')

#commit the changes to db			
connect.commit()

#close the connection
connect.close()