FROM node:12.13.0
RUN npm install sails -g
RUN npm install -g @2fd/graphdoc
USER root
WORKDIR /srv/backend
COPY package*.json ./
RUN npm install
EXPOSE 1337
