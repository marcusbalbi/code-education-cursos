import express from "express"
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/sequelize/customer.model";
import { customerRoute } from "./routes/customer.route";
export const app  = express();

app.use(express.json());
app.use("/customer", customerRoute);

export let sequelize: Sequelize;

async function setupDB() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  sequelize.addModels([CustomerModel]);
  await sequelize.sync();
}


setupDB();
