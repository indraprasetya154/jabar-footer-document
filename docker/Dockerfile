# This stage installs our modules
FROM --platform=linux/amd64 geekduck/node-canvas:alpine
WORKDIR /app
COPY src/package*.json ./

RUN npm i --production

COPY src .
EXPOSE 3000
CMD ["npm", "start"]