FROM node:20-slim
RUN apt-get update -y && apt-get install -y libssl-dev
RUN npm install -g @nestjs/cli

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

CMD [ "npm", "run", "start:prod" ]