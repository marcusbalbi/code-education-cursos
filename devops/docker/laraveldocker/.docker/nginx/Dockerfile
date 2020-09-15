FROM nginx:1.15.0-alpine as builder

ARG HOST
ARG PORT

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz
COPY ./nginx.tpl ./nginx.tpl
RUN dockerize -template ./nginx.tpl:./nginx.conf

FROM nginx:1.15.0-alpine as service
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder ./nginx.conf /etc/nginx/conf.d/nginx.conf