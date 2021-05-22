### STAGE 1: Build ###
FROM node:12.14-alpine AS build
ENV HOME=/usr/src/app
RUN mkdir -p $HOME
WORKDIR $HOME

COPY package*.json $HOME

RUN npm install -g @angular/cli
RUN npm install


EXPOSE 4200
