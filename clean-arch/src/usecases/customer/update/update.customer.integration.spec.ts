import { Sequelize } from "sequelize-typescript";
import { Address } from "../../../domain/customer/entity/Address";
import { Customer } from "../../../domain/customer/entity/Customer";
import CustomerRepository from "../../../infra/customer/repository/customer.repository";
import CustomerModel from "../../../infra/customer/sequelize/customer.model";
import { UpdateCustomerUseCase } from "./update.customer.usecase";

describe("test Update customer Usecase", () => {
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
  it("should update a customer Integration", async () => {
    const customer = new Customer("123", "Jhon Doe")
    customer.defineAddress(new Address("Rua Galvão", 22, "28777654", "Rio de Janeiro"));
    customer.addRewardPoints(1);
    const repository = new CustomerRepository();
    await repository.create(customer);

    const input = {
      id: "123",
      name: "Jhon Doe",
      address: {
        street: "Rua Zac Mand",
        number: 21,
        zip: "2299887766",
        city: "Niteroi",
      },
    };

    const usecase = new UpdateCustomerUseCase(repository);

    const output = await usecase.execute(input);

    expect(output).toEqual(input);
  });
});
