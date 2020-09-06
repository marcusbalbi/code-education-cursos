var connection = require("../common/connection");

module.exports = {
  getClientSaleWithItems(clientID) {
    return connection("sales")
      .select()
      .where("client_id", "=", clientID)
      .then((sales) => {
        let promises = sales.map((sale) => {
          return this.getSalesItems(sale.id).then((items) => {
            sale.items = items;
            return sale;
          });
        });
        return Promise.all(promises).then(() => {
          return sales;
        });
      });
  },
  getSalesItems(saleID) {
    return connection("sales_items").select().where("sales_id", "=", saleID);
  },
};
