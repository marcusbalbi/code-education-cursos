import { Address } from "../../../domain/customer/entity/Address";
import { Customer } from "../../../domain/customer/entity/Customer";
import { FindCustomerUseCase } from "./find.customer.usecase";

const customer = new Customer("123", "Jhon Doe");
customer.defineAddress(new Address("Rua x", 12, "28999888", "Rio de Janeiro"));
customer.addRewardPoints(1);
const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(customer),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("test Find customer Usecase", () => {
  it("should find a customer", async () => {
    const repository = MockRepository();

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
    expect(output).toEqual(expected);
  });

  it("should not find a customer", async () => {
    const repository = MockRepository();
    repository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });

    const input = {
      id: "123",
    };
    const usecase = new FindCustomerUseCase(repository);
    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow();
  });
});
