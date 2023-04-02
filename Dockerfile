# Node Base Image
FROM node:lts-alpine

ENV NODE_OPTIONS="--openssl-legacy-provider"

WORKDIR /app

COPY package*.json ./

# Layers to make our app cached easily to minimize the work needed to build our image 

# Install client dependencies
COPY client/package*.json client/
RUN npm run install-client --force --only=production
# Install server dependencies
COPY server/package*.json server/
RUN npm run install-server --force --only=production

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

USER node

CMD [ "npm", "start", "--prefix", "server" ]

EXPOSE 8000