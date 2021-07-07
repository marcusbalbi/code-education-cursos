const Kafka = require('node-rdkafka');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

function createProducer() {
  return new Kafka.Producer({
    'metadata.broker.list': 'kafka:9092',
    dr_cb: true,
  });
}
console.log('Welcome to Producer');
const producer = createProducer();
producer.connect();

producer.on('ready', () => {
  console.log('Producer Ready!');
  try {
    const payload = Buffer.from(JSON.stringify({ message: argv.message }));
    const topic = 'teste';
    const partition = null;
    const key = 'KAFKA_EXAMPLE';
    producer.produce(
      // Topic to send the message to
      topic,
      // optionally we can manually specify a partition for the message
      // this defaults to -1 - which will use librdkafka's default partitioner (consistent random for keyed messages, random for unkeyed messages)
      partition,
      // Message to send. Must be a buffer
      payload,
      // for keyed messages, we also specify the key - note that this field is optional
      key,
      // you can send a timestamp here. If your broker version supports it,
      // it will get added. Otherwise, we default to 0
      Date.now(),
      // you can send an opaque token here, which gets passed along
      // to your delivery reports
    );
  } catch (err) {
    console.log('Error:' + err.message);
  }
});

producer.on('event.error', function (err) {
  console.error('Error from producer');
  console.error(err);
});

producer.on('delivery-report', function (err, report) {
  // Report of delivery statistics here:
  console.log(report);
  console.log('key:' + report.key.toString());
});

producer.setPollInterval(100);
