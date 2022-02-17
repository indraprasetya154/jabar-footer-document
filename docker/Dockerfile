# This stage installs our modules
FROM --platform=linux/amd64 node:17-alpine
WORKDIR /app
COPY src/package.json src/package-lock.json /app/

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python3
RUN apk add --no-cache \
    build-base \
    g++ \
    cairo-dev \
    jpeg-dev \
    libpng-dev \
    librsvg-dev \
    pango-dev \
    giflib-dev 

RUN npm i node-gyp
RUN npm i --prod

COPY . .
EXPOSE 3000
CMD ["npm", "start"]