# Kafka Example with Typescript

* create topic: kafka-topics --create --bootstrap-server=kafka:9092 --topic=teste --partitions=3
* consume topic: kafka-console-consumer --topic=teste --bootstrap-server=kafka:9092


## Mysql:

* CREATE TABLE categories (id int auto_increment primary key, name varchar(255));
* INSERT INTO categories values(null, 'eletronicos')