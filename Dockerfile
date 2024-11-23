FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm run dev
COPY .
EXPOSE 5000
CMD ["node", "server.js"]