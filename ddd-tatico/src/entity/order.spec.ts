import Order from "./Order";
import OrderItem from "./OrderItem";

describe("Order unit tests", () => {
  test("should throw error when id is empty", () => {
    expect(() => {
      return new Order("", "123", []);
    }).toThrowError();
  });
  test("should throw error when customerId is empty", () => {
    expect(() => {
      return new Order("123", "", []);
    }).toThrowError();
  });
  test("should throw error when items is empty", () => {
    expect(() => {
      return new Order("123", "123", []);
    }).toThrowError();
  });
  test("should calculate total", () => {
    const orderItem1 = new OrderItem("456", "Pizza", 25.00)
    const orderItem2 = new OrderItem("745", "Coca", 12.00)
    const order = new Order("123", "46", [orderItem1, orderItem2]);
    expect(order.total()).toBe(37);
  });
});
