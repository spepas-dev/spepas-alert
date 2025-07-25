FROM node:21-alpine3.18 AS builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
# RUN npm install -g npm@latest
RUN npm ci && npm run build

FROM node:21-alpine3.18

WORKDIR /app
RUN apk add --no-cache curl
COPY package*.json ./
COPY tsconfig.json ./
# RUN npm install -g pm2 npm@latest
RUN npm install -g pm2 
RUN npm ci --production
COPY --from=builder /app/build ./build

EXPOSE 4001

CMD [ "npm", "run", "start" ]
