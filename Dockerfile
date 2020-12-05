FROM node:12

WORKDIR /app

COPY . .
RUN npm cache clean --force
RUN npm install

EXPOSE 3000

# CMD npm start
CMD [ "node", "index.js" ]