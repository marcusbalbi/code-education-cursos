import OrderFactory, { OrderFactoryProps } from "./order.factory";
import crypto from "crypto";

describe("Order Factory test", () => {
  test("should create an order", () => {
    const orderProps: OrderFactoryProps = {
      id: crypto.randomUUID(),
      customerId: crypto.randomUUID(),
      items: [
        {
          id: crypto.randomUUID(),
          name: "p1",
          productId: crypto.randomUUID(),
          price: 100,
          quantity: 5,
        },
      ],
    };

    const order = OrderFactory.create(orderProps);

    expect(order.id).toBe(orderProps.id);
    expect(order.customerId).toBe(orderProps.customerId);
    expect(order.items.length).toBe(1);
  });
});
