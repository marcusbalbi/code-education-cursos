var express = require("express");
var router = express.Router();
var connection = require("../common/connection");
var SalesModel = require("../models/Sales");
var uuid = require("uuid");

/* GET home page. */
router.get("/", function (req, res, next) {
  connection("sales")
    .select()
    .then((data) => {
      res.json(data);
    })
    .catch((perr) => {
      res.status(500).json({ mensagem: perr.message });
    });
});

router.get("/clients_sales/:id", function (req, res, next) {
  connection("clients")
    .select()
    .where("id", "=", req.param("id"))
    .first()
    .then((data) => {
      SalesModel.getClientSaleWithItems(data.id).then((sales) => {
        data.sales = sales;
        res.json(data);
      });
    })
    .catch((perr) => {
      res.status(500).json({ mensagem: perr.message });
    });
});

router.post("/", (req, res, next) => {
  const { items, client_id } = req.body;
  const sale = {
    id: uuid.v4(),
    client_id: client_id,
    total: 0,
  };

  const preparedItems = items.map((item) => {
    return {
      id: uuid.v4(),
      sales_id: sale.id,
      product_id: item.product_id,
      price: item.price,
      amaunt: item.amaunt,
    };
  });
  sale.total = preparedItems.reduce((cur, obj) => {
    return (cur += obj.price * obj.amaunt);
  }, 0);
  // return res.json({ sale, preparedItems })
  try {
    connection("sales")
      .insert(sale)
      .then((data) => {
        connection("sales_items")
          .insert(preparedItems)
          .then(() => {
            res.status(201).json(data);
          });
      });
  } catch (perr) {
    res.status(500).json({ mensagem: perr.message });
  }
});

module.exports = router;
