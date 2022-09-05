import Order from "../entity/Order";

export default class OrderService {
  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0)
  }
}