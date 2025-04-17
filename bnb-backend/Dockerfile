FROM node:16-alpine

WORKDIR /app/backend

COPY backend/package*.json ./

RUN npm install

COPY backend .

EXPOSE 5000

CMD ["npm", "run", "dev"]