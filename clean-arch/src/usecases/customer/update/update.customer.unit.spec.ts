import { cloneDeep } from "lodash";
import { Address } from "../../../domain/customer/entity/Address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import { UpdateCustomerUseCase } from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress( "Jhon Doe", new Address("Rua Galvão", 22, "28777654", "Rio de Janeiro"));

const input = {
  id: customer.id,
  name: "Jane Doe",
  address: {
    street: "Rua Zac Mand",
    number: 21,
    zip: "2299887766",
    city: "Niteroi"
  }
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("unit test update customer use case", () => {
  it("should update a customer", async () => {
    const usecase = new UpdateCustomerUseCase(MockRepository());

    const output = await usecase.execute(input);
    expect(output).toEqual(input);
  });
    it("should throw and error when name is missing", async () => {
      const usecase = new UpdateCustomerUseCase(MockRepository());
      const invalidInput = cloneDeep(input);
      invalidInput.name = "";
      await expect(usecase.execute(invalidInput)).rejects.toThrow(
        "Invalid Name"
      );
    });
});
