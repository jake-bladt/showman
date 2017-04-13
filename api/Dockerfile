FROM node:boron
MAINTAINER jake@jakebladt.com

WORKDIR /api
COPY . /api
EXPOSE 5600:5600
RUN ["npm", "install"]
CMD ["node", "src/api.js"]
