var connection = require("../common/connection");

module.exports = {
  findClientByID(clientID) {
    return connection("clients")
      .where({
        id: clientID,
      })
      .first();
  },
};
