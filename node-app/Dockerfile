FROM node:10.16.0-slim

COPY package.json yarn.lock entrypoint.sh /
RUN yarn

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN ls 

ENTRYPOINT [ "bash", "entrypoint.sh" ]
