import { Customer } from "../entity/Customer";
import Order from "../entity/Order";
import OrderItem from "../entity/OrderItem";
import { randomUUID } from 'crypto';
export default class OrderService {
  static placeOrder(customer: Customer, orderItems: OrderItem[]): Order {
    if (orderItems.length === 0) {
      throw new Error()
    }
    const order = new Order(randomUUID(), customer.id, orderItems);

    customer.addRewardPoints(order.total() / 2);

    return order;
  }
  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0)
  }
}