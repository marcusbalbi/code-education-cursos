import express from "express"
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/sequelize/customer.model";

export const app  = express();

app.use(express.json());


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