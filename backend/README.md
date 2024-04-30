# CMMC-Map Backend

This is a django backend to handle the data part of the app through a restful api.

### Database dependancy

django allows you to use many different databases, but this project is only tested
with mariadb and is currently set up to connect to that in the docker entrypoint.
There shouldn't be any probably in running something more lightweight like sqlite
though if you're feeling adventurous.
