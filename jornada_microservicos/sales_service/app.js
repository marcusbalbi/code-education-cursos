var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var clientsRouter = require("./src/routes/clients");
var productsRouter = require("./src/routes/products");
var salesRouter = require("./src/routes/sales");
var kafkaConsumer = require("./src/kafka/consumers");

kafkaConsumer.consume();

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", salesRouter);
app.use("/sales", salesRouter);

app.use("/clients", clientsRouter);
app.use("/products", productsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
