const { Kafka } = require('kafkajs');
const fs = require('fs');
const kafka = new Kafka({
  clientId: 'typescript-consumer-example',
  brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'teste-group3' });

(async function () {
  await consumer.connect();
  await consumer.subscribe({ topic: 'teste', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      fs.writeFileSync('teste.log', message.value.toString() + '\n', { mode: 0o777, flag: 'a+' });
    },
  });
})();
