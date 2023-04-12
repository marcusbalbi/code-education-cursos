import Product from "../../../domain/product/entity/Product";
import { FindProductUseCase } from "./find.product.usecase";

const product = new Product("123", "Pizza", 29.90);
const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(product),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("test Find product Usecase", () => {
  it("should find a product", async () => {
    const repository = MockRepository();

    const input = {
      id: "123",
    };

    const expected = {
      id: "123",
      name: "Pizza",
      price: 29.90
    };
    const usecase = new FindProductUseCase(repository);
    const output = await usecase.execute(input);
    expect(output).toEqual(expected);
  });

  it("should not find a product", async () => {
    const repository = MockRepository();
    repository.find.mockImplementation(() => {
      throw new Error("product not found");
    });

    const input = {
      id: "123",
    };
    const usecase = new FindProductUseCase(repository);
    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow();
  });
});
