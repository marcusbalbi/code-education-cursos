import OrderItem from "./order-item";

export default interface OrderInterface {
  addItem(item: OrderItem): void;
  removeItem(orderItemId: string, quantity: number): void;
  get id(): string;
  get customerId(): string;
  get items(): OrderItem[];
  total(): number;
}
