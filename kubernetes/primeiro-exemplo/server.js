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

app.get("/configmap", (req, res) => {
  const fs = require('fs');

  try {
    const buff = fs.readFileSync("./myfamily/myfamily.txt");
    res.send(buff.toString());
  } catch(err) {
    res.send("Falha ao ler o arquivo ./myfamily/myfamily.txt");
  }
  
});

app.get("/servre", (req, res) => {
  res.json({
    app_user: process.env.APP_USER,
    app_password: process.env.APP_PASSWORD,
  });
});


app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});
