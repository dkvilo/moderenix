FROM mongo:3.6.14

COPY mongodb.conf /etc/

WORKDIR /etc/

CMD [ "mongod", "--config", "mongodb.conf" ]

