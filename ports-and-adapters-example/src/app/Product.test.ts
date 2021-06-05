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

  it('should disable the product if equals to zero', () => {
    const product = new Product('test Product');
    product.setPrice(0);
    product.disable();
    expect(product.getStatus() === 'disabled');
  });
  it('should throw an error if  disabled a product with greater than zero', () => {
    const product = new Product('test Product');
    product.setPrice(2.5);
    expect(() => {
      product.disable();
    }).toThrowError('The price must be zero  in order to disable the product');
  });
});
