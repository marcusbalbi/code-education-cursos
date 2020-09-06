var connection = require("../common/connection");
var uuid = require("uuid");
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9082"],
});

const producer = kafka.producer();

module.exports = {
  listAll() {
    return connection("customers").select();
  },
  create({ name, birth, level }) {
    const customer = {
      id: uuid.v4(),
      name,
      birth,
      level,
    };
    return connection("customers")
      .returning()
      .insert(customer)
      .then((data) => {
        producer.connect().then(() => {
          producer.send({
            topic: "customers",
            messages: [{ value: JSON.stringify(customer) }],
          });
        });
        return customer;
      });
  },
  update(cliendID, { name, birth, level }) {
    const customer = {
      name,
      birth,
      level,
    };
    connection("customers")
      .returning("*")
      .where({ id: cliendID })
      .update(customer);
  },
  remove(cliendID) {
    connection("customers").returning("*").where({ id: cliendID }).del();
  },
};
