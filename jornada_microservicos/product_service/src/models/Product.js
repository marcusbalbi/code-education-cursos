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
    return connection("products").select();
  },
  create({ price, name }) {
    const product = {
      id: uuid.v4(),
      price: price,
      name: name,
    };
    return connection("products")
      .insert(product)
      .then(() => {
        producer.connect().then(() => {
          producer.send({
            topic: "products",
            messages: [{ value: JSON.stringify(product) }],
          });
        });
        return product;
      });
  },
  update(productID, { price, name }) {
    const product = {
      price,
      name,
    };
    return connection("products").where({ id: productID }).update(product);
  },
  remove(productID) {
    return connection("products").where({ id: productID }).del();
  },
};
