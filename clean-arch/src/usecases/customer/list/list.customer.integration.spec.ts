import { Sequelize } from "sequelize-typescript";
import { Address } from "../../../domain/customer/entity/Address";
import { Customer } from "../../../domain/customer/entity/Customer";
import CustomerRepository from "../../../infra/customer/repository/customer.repository";
import CustomerModel from "../../../infra/customer/sequelize/customer.model";
import { ListCustomerUseCase } from "./list.customer.usecase";

describe("test Listing customer Usecase", () => {
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
  it("should list customers Integration", async () => {
    const customer1 = new Customer("1", "Jhon Doe");
    customer1.defineAddress(
      new Address("Rua x", 12, "28999888", "Rio de Janeiro")
    );
    customer1.addRewardPoints(1);

    const customer2 = new Customer("2", "Jane Doe") 
    customer2.defineAddress(
      new Address("Rua Fagundes", 34, "222333421", "Rio de Janeiro")
    );
    customer2.addRewardPoints(1);

    const repository = new CustomerRepository();
    await repository.create(customer1);
    await repository.create(customer2);

    const usecase = new ListCustomerUseCase(repository);

    const output = await usecase.execute({});

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[1].name).toBe(customer2.name);
  });
});
