import { cloneDeep } from "lodash";
import { Address } from "../../../domain/customer/entity/Address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import { ListCustomerUseCase } from "./list.customer.usecase";
import { UpdateCustomerUseCase } from "./update.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "Jhon Doe",
  new Address("Rua Galvão", 22, "28777654", "Rio de Janeiro")
);

const customer2 = CustomerFactory.createWithAddress(
  "Jane Doe",
  new Address("Rua Fagundes", 34, "222333421", "Rio de Janeiro")
);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("unit test listing customers use case", () => {
  it("should list customers", async () => {
    const usecase = new ListCustomerUseCase(MockRepository());

    const output = await usecase.execute({});

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[1].name).toBe(customer2.name);
  });
});
