FROM nginx:1.15.12-alpine

WORKDIR /etc/nginx/conf.d/

RUN rm default.conf

WORKDIR /

COPY nginx.conf /etc/nginx/conf.d
