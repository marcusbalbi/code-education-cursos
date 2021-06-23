import { ProductFactory, ProductStatus } from '@src/app/Product';
import runProductCli from './Product';

describe('Product CLI test', () => {
  const createProductServiceMock = () => {
    return {
      create: jest.fn((name, price) => {
        return Promise.resolve(ProductFactory.createNewProduct(name, price));
      }),
      get: jest.fn((id) => {
        const product = ProductFactory.create({
          id,
          name: 'fake name',
          price: 0,
          status: ProductStatus.DISABLED,
        });
        return Promise.resolve(product);
      }),
      enable: jest.fn(),
      disable: jest.fn(),
    };
  };
  it('should create a product', async () => {
    const productService = createProductServiceMock();

    const result = await runProductCli(productService, 'create', null, 'TEst', 25.9);
    expect(productService.create).toHaveBeenCalledWith('TEst', 25.9);
    expect(result).toContain('TEst');
    expect(result).toContain('25.9');
  });
  it('should get a product', async () => {
    const productService = createProductServiceMock();

    const result = await runProductCli(productService, '', '123456', null, null);
    expect(productService.get).toHaveBeenCalledWith('123456');
    expect(result).toContain('123456');
  });
});
