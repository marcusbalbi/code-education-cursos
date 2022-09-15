import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import OrderInterface from "../entity/order.interface";

export interface OrderFactoryProps {
  id: string;
  customerId: string;
  items: {
    id: string;
    name: string;
    productId: string;
    price: number;
    quantity: number;
  }[];
}

export default class OrderFactory {
  static create(orderProps: OrderFactoryProps): OrderInterface {
    const orderItems = orderProps.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.productId,
          item.quantity
        )
    );
    const order = new Order(orderProps.id, orderProps.customerId, orderItems);

    return order;
  }
}
