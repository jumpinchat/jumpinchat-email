FROM node:10-alpine as builder

RUN mkdir -p /opt

WORKDIR /opt/

ADD . /opt/

ENV NODE_ENV production

EXPOSE 3001

CMD [ "node", "/opt/src/index.js" ]

