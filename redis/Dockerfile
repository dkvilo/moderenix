FROM redis:alpine

COPY redis.conf /

COPY redis.conf /usr/local/etc/redis/redis.conf

WORKDIR /usr/local/etc/redis/

CMD [ "redis-server", "redis.conf" ]
