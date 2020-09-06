var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var clientsRouter = require("./src/routes/clients");
var productsRouter = require("./src/routes/products");
var salesRouter = require("./src/routes/sales");
var connection = require("./src/common/connection");
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9082"],
});
const consumer = kafka.consumer({ groupId: "customers-group" });
// Consuming
consumer.connect().then(() => {
  consumer.subscribe({ topic: "customers", fromBeginning: true }).then(() => {
    consumer.run({
      eachBatchAutoResolve: false,
      eachBatch: async ({
        batch,
        resolveOffset,
        heartbeat,
        isRunning,
        isStale,
      }) => {
        console.log(batch.messages.length, '***************');
        for (let message of batch.messages) {
          if (!isRunning() || isStale()) break;
          const { id, name, level } = JSON.parse(message.value.toString());
          const client = {
            id,
            name,
            level,
          };
          console.log(
            {
              offset: message.offset,
              value: client,
            },
            "-------------------------------------------------------"
          );
          let result = await connection("clients")
            .insert(client)
          if (result !== undefined) {
            await resolveOffset(message.offset);
          }
          await heartbeat();
        }
      },
      /*eachMessage: async ({ topic, partition, message }) => {
        connection("clients").insert(client).catch(console.log);
        console.log(
          {
            partition,
            offset: message.offset,
            value: client,
          },
          "-------------------------------------------------------"
        );
      },*/
    });
  });
});

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
