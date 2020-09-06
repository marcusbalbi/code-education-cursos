var express = require("express");
var router = express.Router();
var connection = require("../common/connection");
var uuid = require("uuid");

/* GET home page. */
router.get("/", function (req, res, next) {
  connection("customers")
    .select()
    .then((data) => {
      res.json(data);
    })
    .catch((perr) => {
      res.status(500).json({ mensagem: perr.message });
    });
});

router.post("/", (req, res, next) => {
  const customer = {
    id: uuid.v4(),
    name: req.body.name,
    birth: req.body.birth,
    level: req.body.level,
  };
  connection("customers")
    .returning("*")
    .insert(customer)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((perr) => {
      res.status(500).json({ mensagem: perr.message });
    });
});

router.put("/:id", (req, res, next) => {
  const customer = {
    name: req.body.name,
    birth: req.body.birth,
    level: req.body.level,
  };
  connection("customers")
    .returning("*")
    .where({ id: req.param("id") })
    .update(customer)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((perr) => {
      res.status(500).json({ mensagem: perr.message });
    });
});

router.delete("/:id", (req, res, next) => {
  connection("customers")
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
