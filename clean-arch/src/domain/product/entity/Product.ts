import ProductInterface from "./product.interface";

export default class Product implements ProductInterface {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  public changeName(newName: string) {
    this._name = newName;
    this.validate();
  }
  public changePrice(newPrice: number) {
    this._price = newPrice;
    this.validate();
  }

  get id () {
    return this._id;
  }

  get name () {
    return this._name;
  }
  get price () {
    return this._price;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Invalid ID");
    }
    if (this._name.length === 0) {
      throw new Error("Invalid ID");
    }
    if (this._price <= 0) {
      throw new Error("Price should be a positive number");
    }
  }
}
