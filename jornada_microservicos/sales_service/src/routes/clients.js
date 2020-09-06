var express = require("express");
var router = express.Router();
var connection = require("../common/connection");
var uuid = require("uuid");

/* GET home page. */
router.get("/", function (req, res, next) {
  connection("clients")
    .select()
    .then((data) => {
      res.json(data);
    })
    .catch((perr) => {
      res.status(500).json({ mensagem: perr.message });
    });
});

router.post("/", (req, res, next) => {
  const client = {
    id: uuid.v4(),
    name: req.body.name,
    level: req.body.level,
  };
  connection("clients")
    .returning("*")
    .insert(client)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((perr) => {
      res.status(500).json({ mensagem: perr.message });
    });
});

router.put("/:id", (req, res, next) => {
  const client = {
    name: req.body.name,
    level: req.body.level,
  };
  connection("clients")
    .returning("*")
    .where({ id: req.param("id") })
    .update(client)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((perr) => {
      res.status(500).json({ mensagem: perr.message });
    });
});

module.exports = router;
