const { Kafka } = require('kafkajs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const kafka = new Kafka({
  clientId: 'typescript-producer-example',
  brokers: ['kafka:9092'],
});

console.log('Welcome to Producer');

(async function () {
  const producer = kafka.producer();
  await producer.connect();
  const times = argv.times || 1;
  try {
    for (let i = 0; i < times; i++) {
      const payload = Buffer.from(JSON.stringify({ message: argv.message, time: i }));
      const topic = 'teste';
      const partition = null;
      // mensagens com a mesma key são enviadas a mesma partition, garantindo uma ordem de leitura consistente
      const key = 'BALBI2';
      producer.send({
        topic,
        messages: [{ value: payload }],
      });
    }
    console.log('======================================', 'FINISHED!');
  } catch (err) {
    console.log('Error:' + err.message);
  }
})();

// producer.on('event.error', function (err) {
//   console.error('Error from producer');
//   console.error(err);
// });

// producer.on('delivery-report', function (err, report) {
//   // Report of delivery statistics here:
//   console.log(report);
//   if (report.key) {
//     console.log('key:' + report.key.toString());
//   }
// });

// producer.setPollInterval(100);
