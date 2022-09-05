import Product from "../entity/Product";
import ProductService from "./product.service";

describe("Product service unit test", () => {
  test("should change prices of all products", () => {
    const product1 = new Product("p1", "Product 1", 10.0);
    const product2 = new Product("p2", "Product 2", 20.0);

    ProductService.increasePrice([product1, product2], 100);

    expect(product1.price).toBe(20);
    expect(product2.price).toBe(40);
  });
});
