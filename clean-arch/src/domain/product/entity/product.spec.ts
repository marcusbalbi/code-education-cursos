import Product from "./Product";

describe("Product unit tests", () => {
  test("should throw error when id is empty", () => {
    expect(() => {
      return new Product("", "Product 1",25.00);
    }).toThrowError();
  });
  test("should throw error when name is empty", () => {
    expect(() => {
      return new Product("123", "",25.00);
    }).toThrowError();
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
  test('should change name', () => {
    const p = new Product("123", "Pizza", 25.00);
    p.changeName("Hamburguer");
    expect(p.name).toBe("Hamburguer");
  })
  test('should change price', () => {
    const p = new Product("123", "Pizza", 25.00);
    p.changePrice(26.90);
    expect(p.price).toBe(26.90);
  })
});
