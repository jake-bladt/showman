FROM node:boron
MAINTAINER jake@jakebladt.com

WORKDIR /api
COPY . /api
EXPOSE 8088:8088
RUN ["npm", "install"]
CMD ["node", "src/api.js"]
