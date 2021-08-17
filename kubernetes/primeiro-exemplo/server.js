const express = require("express");

const app = express();
const startedAt = Date.now();
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
  const fs = require("fs");

  try {
    const buff = fs.readFileSync("./myfamily/myfamily.txt");
    res.send(buff.toString());
  } catch (err) {
    res.send("Falha ao ler o arquivo ./myfamily/myfamily.txt");
  }
});

app.get("/server", (req, res) => {
  res.json({
    app_user: process.env.APP_USER,
    app_password: process.env.APP_PASSWORD,
  });
});

app.get("/healthz", (req, res) => {
  const seconds = Math.floor((Date.now() - startedAt) / 1000);

  if (seconds < 10) {
    return res.status(500).json({ message: "app not ready!!!", seconds });
  }
  // utilizado para restartar o pode quando o app falha
  // if (seconds > 60 * 30) {
  //   return res.status(500).json({ message: "Fail!!", seconds });
  // }
  return res.status(200).json({ message: "OK!", seconds });
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});
