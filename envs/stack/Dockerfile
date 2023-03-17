FROM node:19.7-slim

ENV ROOT_DIR="/app"

WORKDIR ${ROOT_DIR}

COPY . ./

RUN npm install

CMD ["npm", "start"]