import Product from "../../../domain/product/entity/Product";
import { ListProductUseCase } from "./list.product.usecase";

const product1 = new Product("1", "Pizza", 29.90)
const product2 = new Product("2", "Hamburguer", 19.90)


const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("unit test listing products use case", () => {
  it("should list products", async () => {
    const usecase = new ListProductUseCase(MockRepository());

    const output = await usecase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[1].name).toBe(product2.name);
  });
});
