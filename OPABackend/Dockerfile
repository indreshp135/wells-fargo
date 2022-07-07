FROM python:3.9.1-slim-buster

ENV PYTHONUNBUFFERED=1 \
    PORT=8000

RUN apt-get update --yes --quiet && apt-get install --yes --quiet --no-install-recommends \
    netcat \
    build-essential \
    libpq-dev \
    libmariadbclient-dev \
    libjpeg62-turbo-dev \
    zlib1g-dev \
    libwebp-dev \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*
COPY requirements.txt requirements.txt

RUN python -m pip install --upgrade pip setuptools wheel

RUN pip install -r requirements.txt

COPY . .
