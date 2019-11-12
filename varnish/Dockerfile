FROM varnish:6.0

WORKDIR /etc/varnish/
RUN rm default.vcl

WORKDIR /
COPY default.vcl /etc/varnish/default.vcl
