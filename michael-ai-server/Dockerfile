# Build Stage
FROM node:alpine AS builder

WORKDIR /build

COPY package*.json ./

COPY tsconfig.json ./

RUN npm install

COPY --chown=node:node . .

RUN npm run build


# Production Stage
FROM node:alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

USER node

COPY --from=builder --chown=node:node /build/dist ./src

COPY --from=builder --chown=node:node /build/package*.json ./

RUN npm install --only=prod

EXPOSE 8080

CMD [ "node", "src/index.js" ]