import ProductFactory from "./product.factory";

describe("Product Factory tets", () => {
  test("should create a product type a", () => {
    const product = ProductFactory.create("a", "Product A", 1);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe("Product");
  });
  test("should create b product type a", () => {
    const product = ProductFactory.create("b", "Product B", 1);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(2);
    expect(product.constructor.name).toBe("ProductB");
  });

  test("should not create  product with invalid Type", () => {
    expect(() => {
      ProductFactory.create("c", "Product C", 10);
    }).toThrowError();
  });
});
