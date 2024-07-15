#!/bin/bash

# Configuration
MAX_ATTEMPTS=12
ATTEMPT_INTERVAL=5

wait_for_db() {
    # Parse database host and port from DJANGO_DATABASE_URL
    DB_HOST=$(echo $DJANGO_DATABASE_URL | sed -e 's/mysql:\/\/.*@//' -e 's/:.*//g' -e 's/\/.*//g')
    DB_PORT=$(echo $DJANGO_DATABASE_URL | grep -oP '(?<=:)\d+(?=\/)' || echo "3306")

    echo "Waiting for MariaDB database at $DB_HOST:$DB_PORT to be ready..."
    MAX_ATTEMPTS=12
    ATTEMPT_INTERVAL=5
    attempt=1
    while [ $attempt -le $MAX_ATTEMPTS ]; do
        echo "Attempt $attempt of $MAX_ATTEMPTS: Checking database status..."
        if timeout 5s mysqladmin ping -h"$DB_HOST" -P"$DB_PORT" --silent; then
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
python manage.py add_revision

# Create Django superuser if it doesn't exist
SUPERUSER_NAME=root
SUPERUSER_PASSWORD=${DJANGO_ROOT_PASSWORD}

echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='$SUPERUSER_NAME').exists() or User.objects.create_superuser('$SUPERUSER_NAME', '', '$SUPERUSER_PASSWORD')" | python manage.py shell

echo "Created root user."

python manage.py check --deploy

# Start the Django development server
exec python manage.py runserver 0.0.0.0:8000

