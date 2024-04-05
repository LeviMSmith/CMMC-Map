#!/bin/bash

# Wait for the database to be ready
echo "Waiting 5 seconds for database..."
sleep 5

# Apply database migrations
python manage.py migrate

# Load initial data fixtures
python manage.py loaddata initial_data.json

# Create Django superuser if it doesn't exist
SUPERUSER_NAME=root
SUPERUSER_PASSWORD=${DJANGO_ROOT_PASSWORD}

echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='$SUPERUSER_NAME').exists() or User.objects.create_superuser('$SUPERUSER_NAME', '', '$SUPERUSER_PASSWORD')" | python manage.py shell

echo "Created root user."

# Start the Django development server
exec python manage.py runserver 0.0.0.0:8000

