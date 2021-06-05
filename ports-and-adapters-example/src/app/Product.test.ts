import { Product } from './Product';

describe('Product.ts', () => {
  it('should enable the product if greater than zero', () => {
    const product = new Product('test Product');
    product.setPrice(2.5);
    product.enable();
    expect(product.getStatus() === 'enabled');
  });
  it('should throw an error if  enables a product with price of zero', () => {
    const product = new Product('test Product');
    expect(() => {
      product.enable();
    }).toThrowError('The price must be greater than 0 to enable the product');
  });
});
