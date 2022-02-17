FROM --platform=linux/amd64 node:17-alpine
WORKDIR /app
COPY src/package*.json ./

RUN npm i --production

COPY src .
EXPOSE 3000
CMD ["npm", "start"]