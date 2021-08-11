const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello from Full Cycle" });
});
app.get("/info", (req, res) => {
  res.json({
    app_name: process.env.APP_NAME,
    app_version: process.env.APP_VERSION,
  });
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});
