import { cloneDeep } from "lodash";
import Product from "../../../domain/product/entity/Product";
import { UpdateProductUseCase } from "./update.product.usecase";

const product = new Product("123", "Pizza", 29.90);

const input = {
  id: product.id,
  name: "Hamburguer sandwich",
  price: 20,
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("unit test update product use case", () => {
  it("should update a product", async () => {
    const usecase = new UpdateProductUseCase(MockRepository());

    const output = await usecase.execute(input);
    expect(output).toEqual(input);
  });
    it("should throw and error when name is missing", async () => {
      const usecase = new UpdateProductUseCase(MockRepository());
      const invalidInput = cloneDeep(input);
      invalidInput.name = "";
      await expect(usecase.execute(invalidInput)).rejects.toThrow(
        "product: Name is required"
      );
    });
});
