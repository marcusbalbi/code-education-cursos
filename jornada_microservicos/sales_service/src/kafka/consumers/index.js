var connection = require("../../common/connection");
var kafka = require("../kafka");

module.exports = {
  customer() {
    const consumer = kafka.consumer({ groupId: "customers-group" });
    // Consuming
    consumer.connect().then(() => {
      consumer
        .subscribe({ topic: "customers", fromBeginning: true })
        .then(() => {
          consumer.run({
            eachBatchAutoResolve: false,
            eachBatch: async ({
              batch,
              resolveOffset,
              heartbeat,
              isRunning,
              isStale,
            }) => {
              for (let message of batch.messages) {
                if (!isRunning() || isStale()) break;
                const { id, name, level } = JSON.parse(
                  message.value.toString()
                );
                const client = {
                  id,
                  name,
                  level,
                };
                let result = await connection("clients").insert(client);
                if (result !== undefined) {
                  await resolveOffset(message.offset);
                }
                await heartbeat();
              }
            },
            /*eachMessage: async ({ topic, partition, message }) => {
        connection("clients").insert(client).catch(console.log);
        console.log(
          {
            partition,
            offset: message.offset,
            value: client,
          },
          "-------------------------------------------------------"
        );
      },*/
          });
        });
    });
  },
  product() {
    const consumer = kafka.consumer({ groupId: "products-group" });
    // Consuming
    consumer.connect().then(() => {
      consumer
        .subscribe({ topic: "products", fromBeginning: true })
        .then(() => {
          consumer.run({
            eachBatchAutoResolve: false,
            eachBatch: async ({
              batch,
              resolveOffset,
              heartbeat,
              isRunning,
              isStale,
            }) => {
              for (let message of batch.messages) {
                if (!isRunning() || isStale()) break;
                const { id, name, level } = JSON.parse(
                  message.value.toString()
                );
                const product = {
                  id,
                  name,
                  price,
                };
                let result = await connection("products").insert(product);
                if (result !== undefined) {
                  await resolveOffset(message.offset);
                }
                await heartbeat();
              }
            },
          });
        });
    });
  },
  consume() {
    this.customer();
    this.product()
  },
};
