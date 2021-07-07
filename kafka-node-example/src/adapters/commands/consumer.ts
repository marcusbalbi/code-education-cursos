const Kafka = require('node-rdkafka');
const fs = require('fs');
// const argv = yargs(hideBin(process.argv)).argv;

function createConsumer() {
  // https://github.com/edenhill/librdkafka/blob/v1.6.1/CONFIGURATION.md
  return new Kafka.KafkaConsumer(
    {
      'metadata.broker.list': 'kafka:9092',
      'client.id': 'typescript-consumer-client-example',
      'group.id': 'typescript-consumer-client-group-example',
    },
    {
      'auto.offset.reset': 'earliest',
    },
  );
}

const consumer = createConsumer();
// Flowing mode
consumer.connect();

consumer
  .on('ready', () => {
    consumer.subscribe(['teste']);

    consumer.consume();
  })
  .on('data', (data) => {
    // Output the actual message contents
    // fs.writeFileSync('teste.log', data.value.toString() + '\n', { mode: 0o777, flag: 'a+' });
    console.log(data.value.toString());
  });

consumer.on('event.error', function (err) {
  console.error('Error from consumer');
  console.error(err);
});
