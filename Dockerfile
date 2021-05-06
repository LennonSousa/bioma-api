FROM node:alpine

WORKDIR /user/app

COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE 3333

CMD ["yarn", "dev"]