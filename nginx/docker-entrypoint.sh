#!/bin/sh

# Extract the domain from PROJECT_URL
# This uses sed to remove the protocol part and any port number
DOMAIN=$(echo $PROJECT_URL | sed -e 's,^\(http://\)\?\(https://\)\?,,g' -e 's,:.*$,,g')

# Use envsubst to substitute the environment variable into the Nginx configuration
# We're using DOMAIN now instead of PROJECT_URL directly
export DOMAIN  # Ensure this is exported so envsubst can see it
envsubst '${DOMAIN}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Start Nginx in the foreground
nginx -g 'daemon off;'

