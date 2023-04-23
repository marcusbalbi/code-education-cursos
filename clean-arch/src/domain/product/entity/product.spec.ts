import Product from "./Product";

describe("Product unit tests", () => {
  test("should throw error when id is empty", () => {
    expect(() => {
      return new Product("", "Product 1", 25.0);
    }).toThrowError();
  });
  test("should throw error when name is empty", () => {
    expect(() => {
      return new Product("123", "", 25.0);
    }).toThrowError();
  });
  test("should throw error when name is empty, id is invalid and price incorrect", () => {
    expect(() => {
      return new Product("", "", -25.0);
    }).toThrowError(
      "product: Invalid ID, product: Invalid Name, product: Price should be a positive number"
    );
  });
  test("should throw error when price is not a number", () => {
    expect(() => {
      return new Product("123", "", NaN);
    }).toThrowError();
  });
  test("should throw error when price is a negative number", () => {
    expect(() => {
      return new Product("123", "", -90);
    }).toThrowError();
  });
  test("should change name", () => {
    const p = new Product("123", "Pizza", 25.0);
    p.changeName("Hamburguer");
    expect(p.name).toBe("Hamburguer");
  });
  test("should change price", () => {
    const p = new Product("123", "Pizza", 25.0);
    p.changePrice(26.9);
    expect(p.price).toBe(26.9);
  });
});
