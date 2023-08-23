# IT Blog

## 04/2023 - I need to create ITBlog models and API endpoint for the ITBlog (React) frontend
1. Create a Django app - python manage.py startapp appname
2. In the settings.py, add app to INSTALLED_APPS
3. In the models.py, create models (need one-to-many relationship this time, Sqlite does not support ArrayField)
4. makemigrations and migrate - creates a set of instructions that Django can use to modify the database schema to match the new model definitions
5. In the admin.py, add models to admin panel
6. In the serializers.py, add serializers
7. In the views.py, create views ( views handle HTTP requests and returns a response)
8. In the urls.py, add views (URL patterns map URLs to a view functions)
9. Test on Postman
Notes: changed null=True to default=""

## How to set up Django and Gunicorn on Ubuntu server
1. Create a virtual environment - python3 -m venv venv
2. Activate virtual environment - source venv/bin/activate
3. Install dependencies - pip3 install -r requirements.txt
4. Install gunicorn - pip3 install gunicorn (this will add gunicorn to venv/bin/)
5. Check the venv/bin/gunicorn file to make sure the #! shebang path is correct
6. Check if Gunicorn can host project - gunicorn <django project>.wsgi:application --bind 0.0.0.0:8000
7. Configure gunicorn service file: /etc/systemd/system/gunicorn.service
8. Run these commands: 
    sudo systemctl start gunicorn
    sudo systemctl enable gunicorn
    sudo systemctl status gunicorn
    sudo systemctl daemon-reload
    sudo systemctl restart gunicorn
