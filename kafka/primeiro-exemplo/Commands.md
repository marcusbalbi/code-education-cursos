### Tópicos

- kafka-topics --create --topic=teste --bootstrap-server=localhost:9092 --partitions=3
- kafka-topics --list --bootstrap-server=localhost:9092
- kafka-topics --bootstrap-server=localhost:9092 --topic=teste --describe

### Consumers

- kafka-console-consumer --bootstrap-server=localhost:9092 --topic=teste
- kafka-console-consumer --bootstrap-server=localhost:9092 --topic=teste --from-beginning

#### consumers no mesmo group dividem a leitura dos eventos

- kafka-console-consumer --bootstrap-server=localhost:9092 --topic=teste --group=x

### Producer

- kafka-console-producer --bootstrap-server=localhost:9092 --topic=teste

### groups

- kafka-consumer-groups --bootstrap-server=localhost:9092 --group=x --describe
