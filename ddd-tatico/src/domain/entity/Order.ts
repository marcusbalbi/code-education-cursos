import OrderItem from "./OrderItem";

export default class Order {
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
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }
}
