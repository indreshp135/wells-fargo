FROM python:3.9-alpine as build

RUN apk add --no-cache gcc musl-dev python3-dev

RUN apk add --no-cache libressl-dev musl-dev libffi-dev

COPY requirements.txt requirements.txt

RUN python -m pip install --upgrade pip setuptools wheel

RUN pip install -r requirements.txt

COPY . .
