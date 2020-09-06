var express = require("express");
var router = express.Router();
var connection = require("../common/connection");
var uuid = require("uuid");

/* GET home page. */
router.get("/", function (req, res, next) {
  connection("products")
    .select()
    .then((data) => {
      res.json(data);
    })
    .catch((perr) => {
      res.status(500).json({ mensagem: perr.message });
    });
});

router.post("/", (req, res, next) => {
  const product = {
    id: uuid.v4(),
    price: req.body.price,
    name: req.body.name,
  };
  connection("products")
    .returning("*")
    .insert(product)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((perr) => {
      res.status(500).json({ mensagem: perr.message });
    });
});

router.put("/:id", (req, res, next) => {
  const product = {
    price: req.body.price,
    name: req.body.name,
  };
  connection("products")
    .returning("*")
    .where({ id: req.param("id") })
    .update(product)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((perr) => {
      res.status(500).json({ mensagem: perr.message });
    });
});

router.delete("/:id", (req, res, next) => {
  connection("products")
    .returning("*")
    .where({ id: req.param("id") })
    .del()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((perr) => {
      res.status(500).json({ mensagem: perr.message });
    });
});

module.exports = router;
