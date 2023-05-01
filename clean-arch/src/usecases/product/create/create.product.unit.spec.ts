import { cloneDeep } from "lodash";
import { CreateProductUseCase } from "./create.product.usecase";

const input = {
  name: "Pizza",
  price: 29.90
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("unit test create product use case", () => {
  it("should create a product", async () => {
    const usecase = new CreateProductUseCase(MockRepository());

    const output = await usecase.execute(input);
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: 29.90
    });
  });

  it("should throw and error when name is missing", async () => {
    const usecase = new CreateProductUseCase(MockRepository());
    const invalidInput = cloneDeep(input);
    invalidInput.name = "";
    await expect(usecase.execute(invalidInput)).rejects.toThrow(
      "product: Name is required"
    );
  })
});
