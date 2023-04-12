import { Sequelize } from "sequelize-typescript";
import CustomerRepository from "../../../infra/customer/repository/customer.repository";
import CustomerModel from "../../../infra/customer/sequelize/customer.model";
import { CreateCustomerUseCase } from "./create.customer.usecase";

const input = {
  name: "Jhon Doe",
  address: {
    street: "Rua Galvão",
    number: 22,
    zip: "28777654",
    city: "Rio de Janeiro",
  },
};
describe("test Create Customer Usecase Integration", () => {
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
  it("should create a product", async () => {
    const repository = new CustomerRepository();

    const usecase = new CreateCustomerUseCase(repository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    });
  });
});
