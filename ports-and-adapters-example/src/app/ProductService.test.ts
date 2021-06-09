import { ProductFactory } from './Product';
import { ProductService } from './ProductService';

const createPersistenceMockFactory = () => {
  return {
    get: jest.fn(),
    save: jest.fn(),
  };
};

describe('ProductService.ts', () => {
  it('get should return a ProductInterface', async (done) => {
    const persistence = createPersistenceMockFactory();
    const product = ProductFactory.createNewProduct();
    persistence.get = jest.fn(() => {
      return Promise.resolve(product);
    });
    const service = new ProductService(persistence);

    const result = await service.get('some valid id');
    expect(result).not.toBeNull();
    expect(result).toBe(product);
    expect(persistence.get).toHaveBeenCalledTimes(1);
    done();
  });

  it('get should return null if Product not found', async (done) => {
    const persistence = createPersistenceMockFactory();
    const service = new ProductService(persistence);

    const result = await service.get('some invalid id');
    expect(result).toBeNull();
    expect(persistence.get).toHaveBeenCalledTimes(1);
    done();
  });
});
