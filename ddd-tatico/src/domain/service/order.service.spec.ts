import { Customer } from "../entity/Customer";
import Order from "../entity/Order";
import OrderItem from "../entity/OrderItem";
import OrderService from "./order.service";

describe("Order Service unit test", () => {
  test("should get total of all orders", () => {
    const item1 = new OrderItem("i1", "Coca cola", 10, "p1", 2);
    const item2 = new OrderItem("i2", "Mineral Water", 5, "p2", 1);

    const order1 = new Order("o1", "cliente1", [item1]);
    const order2 = new Order("o2", "cliente2", [item2]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(25);
  });

  test("should place an order", () => {
    const customer = new Customer("c1", "Jhon Doe");
    const item1 = new OrderItem("i1", "Coca cola", 10, "p1", 1);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total)


  });
});
