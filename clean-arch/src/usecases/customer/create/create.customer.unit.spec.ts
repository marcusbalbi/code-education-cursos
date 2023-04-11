import { cloneDeep } from "lodash";
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

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("unit test create customer use case", () => {
  it("should create a customer", async () => {
    const usecase = new CreateCustomerUseCase(MockRepository());

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

  it("should throw and error when name is missing", async () => {
    const usecase = new CreateCustomerUseCase(MockRepository());
    const invalidInput = cloneDeep(input);
    invalidInput.name = "";
    await expect(usecase.execute(invalidInput)).rejects.toThrow("Invalid Name");
  })
});
