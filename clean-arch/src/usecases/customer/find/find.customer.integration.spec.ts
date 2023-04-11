import { Sequelize } from "sequelize-typescript";
import { Address } from "../../../domain/customer/entity/Address";
import { Customer } from "../../../domain/customer/entity/Customer";
import CustomerRepository from "../../../infra/customer/repository/customer.repository";
import CustomerModel from "../../../infra/customer/sequelize/customer.model";
import { FindCustomerUseCase } from "./find.customer.usecase";

describe("test Find customer Usecase", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
  it("should find a customer", async () => {
    const customer = new Customer("123", "Jhon Doe");
    customer.defineAddress(
      new Address("Rua x", 12, "28999888", "Rio de Janeiro")
    );
    customer.addRewardPoints(1)
    const repository = new CustomerRepository();
    await repository.create(customer);

    const input = {
      id: "123",
    };

    const expected = {
      id: "123",
      name: "Jhon Doe",
      address: {
        street: "Rua x",
        city: "Rio de Janeiro",
        number: 12,
        zip: "28999888",
      },
    };

    const usecase = new FindCustomerUseCase(repository);

    const output = await usecase.execute(input);

    expect(output).toEqual(expected)
  });
});
