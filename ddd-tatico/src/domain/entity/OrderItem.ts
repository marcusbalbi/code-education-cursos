export default class OrderItem {
  private _id: string;
  private _name: string;
  private _productId: string;
  private _price: number;
  private _quantity: number;

  constructor(
    id: string,
    name: string,
    price: number,
    productId: string,
    quantity: number
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._productId = productId;
    this._quantity = quantity;
  }

  get name() {
    return this._name;
  }

  get quantity() {
    return this._quantity;
  }

  set quantity(value) {
    this._quantity = value; 
  }

  total(): number {
    return this._price * this._quantity;
  }

  get price(): number {
    return this._price;
  }

  get id() {
    return this._id;
  }

  get productId() {
    return this._productId;
  }
}