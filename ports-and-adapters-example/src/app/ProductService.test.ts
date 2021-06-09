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
    persistence.get = jest.fn(() => {
      const product = ProductFactory.createNewProduct();
      return Promise.resolve(product);
    });
    const service = new ProductService(persistence);

    const result = await service.get('some valid id');
    expect(result).not.toBeNull();
    expect(result.getID().length).toBe(36);
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
