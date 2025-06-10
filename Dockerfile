FROM node:18

WORKDIR /app

RUN npm install -g expo-cli

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 19000 19001 19002

CMD ["npx", "expo", "start", "--tunnel"]