FROM node:6.12.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY yarn.lock /usr/src/app/
COPY package.json /usr/src/app/
RUN yarn --force
COPY . /usr/src/app

CMD [ "yarn", "start" ]

EXPOSE 5000
