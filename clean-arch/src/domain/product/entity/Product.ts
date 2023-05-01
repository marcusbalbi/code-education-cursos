import { BaseEntity } from "../../@shared/entity/entity.abstract";
import { ProductValidatorFactory } from "../factory/product.validator.factory";
import ProductInterface from "./product.interface";

export default class Product extends BaseEntity implements ProductInterface {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
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

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }
  get price() {
    return this._price;
  }

  validate() {
    ProductValidatorFactory.create().validate(this);
    if (this.notification.hasErrors()) {
      this.notification.throwErrors("product");
    }
  }
}
