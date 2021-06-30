### Tópicos

* kafka-topics --create --topic=teste --bootstrap-server=localhost:9092 --partitions=3
* kafka-topics --list --bootstrap-server=localhost:9092
* kafka-topics --bootstrap-server=localhost:9092  --topic=teste --describe

### Consumers

* kafka-console-consumer --bootstrap-server=localhost:9092 --topic=teste
* kafka-console-consumer --bootstrap-server=localhost:9092 --topic=teste --from-beginning

### Producer

* kafka-console-producer --bootstrap-server=localhost:9092 --topic=teste