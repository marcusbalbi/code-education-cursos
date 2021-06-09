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

  it('should save a product', async () => {
    const persistence = createPersistenceMockFactory();
    persistence.save = jest.fn((product) => Promise.resolve(product));
    const service = new ProductService(persistence);

    const result = await service.create('Product test', 25.9);

    expect(persistence.save).toHaveBeenCalledTimes(1);
    expect(result).not.toBe(null);
    expect(result.getName()).toBe('Product test');
    expect(result.getPrice()).toBe(25.9);
  });

  it('should not save a product', async () => {
    const persistence = createPersistenceMockFactory();
    persistence.save = jest.fn(() => null);
    const service = new ProductService(persistence);

    const result = await service.create('Product test', 25.9);

    expect(persistence.save).toHaveBeenCalledTimes(1);
    expect(result).toBe(null);
  });
});
