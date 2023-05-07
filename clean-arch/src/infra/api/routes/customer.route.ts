import express, { Request, Response } from "express";
import { CreateCustomerUseCase } from "../../../usecases/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repository/customer.repository";
import { ListCustomerUseCase } from "../../../usecases/customer/list/list.customer.usecase";
import { CustomerPresenter } from "../presenters/customer.presenter";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip,
      },
    };
    const output = await usecase.execute(customerDto);
    res.status(200).send(output);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

customerRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());
  try {
    const output = await usecase.execute({});
    res.format({
      json: async () => res.send(output),
      xml: async () => res.send(CustomerPresenter.toXml(output)),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
