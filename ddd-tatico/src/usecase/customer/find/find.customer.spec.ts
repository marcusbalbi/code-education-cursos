import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infra/customer/sequelize/customer.model";
import CustomerRepository from "../../../infra/customer/repository/customer.repository";
import { Customer } from "../../../domain/customer/entity/Customer";
import { Address } from "../../../domain/customer/entity/Address";

describe("test find customer user case", () => {
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
    const repo = new CustomerRepository();
    const customer = new Customer("123", "Jhon doe")
    const address = new Address("Rua Alberto Braga", 45, "28613110", "Rio de Janeiro");
    customer.defineAddress(address);
    repo.create(customer);

    const input = { id: "123" };
    const output = new FindCustomerUseCase(repo).execute(input);
    const expectedOutput = {
      id: "123",
      name: "Jhon Doe",
      address: {
        street: "Rua Alberto Brag",
        city: "Rio de Janeiro",
        number: "45",
        zip: "28613110",
      }
    };
    expect(output).toMatchObject(expectedOutput);
  })
});
