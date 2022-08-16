FROM --platform=linux/amd64 registry.digitalservice.id/proxyjds/library/node:16-alpine
WORKDIR /app
COPY src/package*.json ./

RUN npm i --production

COPY src .
EXPOSE 3000
CMD ["npm", "start"]