# hachioji-hazardmap

[Tokyo OSS Party!!](https://tokyo-oss-party.com/) 2021 チームI

## Requirements

- Python
- [Pipenv](https://pipenv.pypa.io/en/latest/)

## Setup

    $ pipenv install
    $ cp .env.sample .env

## Start the local server

    $ pipenv run pygeoapi serve

## Generate openapi.yml

    $ pipenv run pygeoapi openapi generate pygeoapi-config.yml > openapi.yml
