const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello from Full Cycle" });
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});
