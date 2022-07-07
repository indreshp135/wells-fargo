#!/bin/sh

until psql postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${SQL_HOST}/${POSTGRES_DB} -c '\l'; do
    echo -e "\e[34m >>> Postgres is unavailable - sleeping \e[97m"
    sleep 10
done

python manage.py makemigrations
python manage.py migrate
python manage.py create_admin
exec "$@"
