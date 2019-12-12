FROM node:12.13.0
RUN npm install sails -g
USER root
WORKDIR /srv/backend
COPY package*.json ./
RUN npm install
EXPOSE 1337
