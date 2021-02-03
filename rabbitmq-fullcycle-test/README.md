# rabbitmq-fullcycle-test

- Message Broker
- Implementa AMQP, MQTT, STOMP, HTTP
- Faz a "ponte" na comunicação entre diversos sistemas
- Desenvolvido em Erlang
- Desacoplamento entre serviços
- Rápido e Poderoso
- Padrão de Mercado

## Tipos de Exchanges

- Direct
- Fanout
- Topic
- Headers

## Filas

- Padrão FIFO

### Propriedades

- Durable - se será salva, mesmo depois do broker ser reiniciado
- auto-delete - Removida Automaticamente caso não tenha mais nenhum consumer
- Expire - define o tempo que não há mensagens ou clientes na fila
- Message_ttl - tempo de vida da msg
- overflow - caso ultrapasse o limite de quantidade de mensagens ou tamanho
  - DROP HEAD - remove a ultima
  - REJECT PUBLISH - para de receber
- Exclusive - somente o canal que criou pode acessar
- MAXLENGHT ou Bytes - Quantidade de Mensagens ou Tamanho em Bytes

## Dead Letter Queues

- Algumas mensagens Não conseguem ser entregues por qualquer motivo
- são encaminhaods para uma exchange especifica
- tias mensagnes podem ser consumidas e averiguadas posteriormente

## Lazy Queues

- Mensagens são armazenadas em disco
  - Consumidores Lentos
- Exige auto I/O
- QUando há muitas mensagens em uma fila por qualquer motivo, há a possibilidade deliberar memoria jogando especificamente as mensagens da fila em qeustão em disco.

## Confiabilidade

- Como Garantir que as mensagens não serão perdidas no caminho ?
- como garantir que as mensagens foram processadas corretamente ?
- Recursos do RAbbitMQ para resolver tais problemas:
  - Consumer ack
  - publish confirm
  - Filas e Mensagens duraveis/persistidas

## Simular

- http://tryrabbitmq.com/
