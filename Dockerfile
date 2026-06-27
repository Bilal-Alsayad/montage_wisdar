FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --include=dev

COPY . .

ENV PORT=8000
EXPOSE 8000

CMD ["npm", "run", "api"]
