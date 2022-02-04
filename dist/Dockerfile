FROM node:16.13.2-alpine
WORKDIR /app
RUN npm init -y
RUN yarn add express
COPY . /app/
CMD ["node", "server.js"]
