import OrderItem from "./order-item";
import OrderInterface from "./order.interface";

export default class Order implements OrderInterface {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Invalid ID");
    }
    if (this._customerId.length === 0) {
      throw new Error("Invalid Customer ID");
    }
    if (this._items.length === 0) {
      throw new Error("Items list can not be empty");
    }
    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error("Items quantity should be greater than zero");
    }
  }

  addItem(orderItem: OrderItem) {
    // this mehtod updates the obejct direclty maybe we could recreate it to prevent future bugs
    // should we check the other properties too?
    const itemFound = this._items.find(item => item.id === orderItem.id);

    if (!itemFound) {
      this._items.push(orderItem);
      return;
    }
    itemFound.quantity += orderItem.quantity;
  }

  removeItem(orderItemId: string, quantity: number) {
    const itemFound = this._items.find((item) => item.id === orderItemId);

    if (!itemFound || quantity <= 0) {
      throw new Error('Fail trying to remove item, item not found or invalid quantity')
    }
    if (itemFound.quantity <= quantity) {
      throw new Error(`Fail trying to remove quantity (${ quantity }) from item ${ itemFound.id }, item quantity is lower or equal: ${ itemFound.quantity }`)
    }
    itemFound.quantity -= quantity;
  }

  get id() {
    return this._id;
  }

  get customerId() {
    return this._customerId;
  }

  get items () {
    return this._items;
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.total(), 0);
  }
}
