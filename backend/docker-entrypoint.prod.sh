#!/bin/bash

# Configuration
DB_HOST=db
DB_PORT=3306
MAX_ATTEMPTS=10
ATTEMPT_INTERVAL=5

# Function to wait for the database to be ready
wait_for_db() {
    echo "Waiting for MariaDB database to be ready..."
    attempt=1
    while [ $attempt -le $MAX_ATTEMPTS ]; do
        echo "Attempt $attempt of $MAX_ATTEMPTS: Checking database status..."
        if mysqladmin ping -h"$DB_HOST" -P"$DB_PORT" --silent; then
            echo "Database is ready!"
            return 0
        else
            echo "Database not ready yet, waiting $ATTEMPT_INTERVAL seconds..."
            sleep $ATTEMPT_INTERVAL
            ((attempt++))
        fi
    done

    echo "Failed to connect to database after $MAX_ATTEMPTS attempts!"
    exit 1
}

# Wait for the database to be ready
wait_for_db

# Apply database migrations
python manage.py migrate

# Load initial data fixtures
python manage.py loaddata initial_data.json

# Create Django superuser if it doesn't exist
SUPERUSER_NAME=root
SUPERUSER_PASSWORD=${DJANGO_ROOT_PASSWORD}

echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='$SUPERUSER_NAME').exists() or User.objects.create_superuser('$SUPERUSER_NAME', '', '$SUPERUSER_PASSWORD')" | python manage.py shell

echo "Created root user."

python manage.py check --deploy

# Start the Django development server
exec python manage.py runserver 0.0.0.0:8000

