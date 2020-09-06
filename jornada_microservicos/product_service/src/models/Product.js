var connection = require("../common/connection");
var uuid = require("uuid");

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
    return connection("products").insert(product);
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
