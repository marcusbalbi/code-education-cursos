import Product from "../entity/Product";
import ProductInterface from "../entity/product.interface";
import crypto from "crypto";
import ProductB from "../entity/product-b";

export default class ProductFactory {
  static create(type: string, name: string, price: number): ProductInterface {
    switch (type) {
      case "a": {
        return new Product(crypto.randomUUID(), name, price);
      }
      case "b": {
        return new ProductB(crypto.randomUUID(), name, price);
      }
      default: {
        throw new Error("Invalid Product Type");
      }
    }
  }
}
