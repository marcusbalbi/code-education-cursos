FROM node:14

WORKDIR /var/www/app

RUN apt-get update
RUN apt-get install librdkafka-dev -y

CMD ["npm", "start"]

EXPOSE 3000
