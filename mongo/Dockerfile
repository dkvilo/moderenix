FROM mongo:3.4.20

COPY mongodb.conf /etc/

WORKDIR /etc/

CMD [ "mongod", "--config", "mongodb.conf" ]

