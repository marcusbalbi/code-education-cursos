var express = require("express");
var router = express.Router();
var Customer = require("../models/Customer");
/* GET home page. */
router.get("/", function (req, res, next) {
  Customer.listAll()
    .then((data) => {
      res.json(data);
    })
    .catch((perr) => {
      res.status(500).json({ mensagem: perr.message });
    });
});

router.post("/", (req, res, next) => {
  Customer.create(req.body)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((perr) => {
      res.status(500).json({ mensagem: perr.message });
    });
});

router.put("/:id", (req, res, next) => {
  Customer.update(req.param("id"), req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((perr) => {
      res.status(500).json({ mensagem: perr.message });
    });
});

router.delete("/:id", (req, res, next) => {
  Customer.remove(req.param("id"))
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((perr) => {
      res.status(500).json({ mensagem: perr.message });
    });
});

module.exports = router;
