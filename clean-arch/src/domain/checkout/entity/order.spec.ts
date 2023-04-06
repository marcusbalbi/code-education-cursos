import Order from "./order";
import OrderItem from "./order-item";

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
    const orderItem1 = new OrderItem("456", "Pizza", 25.0, "p1", 2);
    const orderItem2 = new OrderItem("745", "Coca", 12.0, "p2", 2);
    const order = new Order("123", "46", [orderItem1, orderItem2]);
    expect(order.total()).toBe(74);
  });
  test("should throw error if item quantity is greater than zero", () => {
    expect(() => {
      const orderItem1 = new OrderItem("456", "Pizza", 25.0, "p1", 0);
      const orderItem2 = new OrderItem("745", "Coca", 12.0, "p2", 2);
      new Order("123", "46", [orderItem1, orderItem2]);
    }).toThrowError();
  });

  test("it should add an Item to Order", () => {
    const orderItem1 = new OrderItem("456", "Pizza", 25.0, "p1", 2);
    const orderItem2 = new OrderItem("745", "Coca", 12.0, "p2", 2);
    const order = new Order("123", "46", [orderItem1]);
    order.addItem(orderItem2);
    expect(order.items.length).toBe(2);
    expect(order.total()).toBe(74);

    order.addItem(new OrderItem("456", "Pizza", 25.0, "p1", 5));
    expect(order.total()).toBe(199);
  });

  test("it should remove an order item", () => {
    const orderItem1 = new OrderItem("456", "Pizza", 25.0, "p1", 2);
    const orderItem2 = new OrderItem("745", "Coca", 12.0, "p2", 2);
    const order = new Order("123", "46", [orderItem1, orderItem2]);
    expect(order.items.length).toBe(2);
    expect(order.total()).toBe(74);
    order.removeItem("456", 1);
    expect(order.total()).toBe(49)
  });
});
