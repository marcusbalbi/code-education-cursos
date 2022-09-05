import Product from "../entity/Product";

export default class ProductService {
  static increasePrice(products: Product[], percentage: number): void {
    if (percentage <= 0) {
      throw new Error('Percentage must be a positive value')
    }
    products.forEach((product) => {
      product.changePrice((product.price * percentage) / 100 + product.price);
    })
  }
}