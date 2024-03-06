# CMMC-Handler Backend

This is a django backend to handle the data part of the app through a restful api.

This is under heavy development and won't really work for anything yet.

## Dependancies

### Code dependancies

Like most python projects, it's probably best to give this it's own virtual environment and install the requirements from the requirements.txt to that. This can be accomplished by running the following commands:

In this directory (CMMC-handler/backend) run

```
python -m venv venv
source ./venv/bin/activate
pip install -r requirements.txt
```

### Database dependancy

django allows you to use many different databases, but this project will likely largely be tested with mariadb and is currently set up to connect to that. There shouldn't be any probably in running something more lightweight like sqlite though.

## Running

With the same venv activated, run `python manage.py runserver`

In the future this will probably be done with scripts to run this with the frontend and/or in a container. But for now that command works and settings must be set manually in cmmchandler/settings.py
