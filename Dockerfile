FROM geopython/pygeoapi:latest

COPY ./pygeoapi-config.yml /pygeoapi/local.config.yml
ADD ./data /pygeoapi/data

CMD ["run"]
