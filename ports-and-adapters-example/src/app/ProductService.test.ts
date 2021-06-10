import { ProductFactory, ProductStatus } from './Product';
import { ProductService, ProductCreationError } from './ProductService';

const createPersistenceMockFactory = () => {
  return {
    get: jest.fn(),
    save: jest.fn((product) => Promise.resolve(product)),
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

  it('get should throw error if Product not found', async (done) => {
    const persistence = createPersistenceMockFactory();
    const service = new ProductService(persistence);

    const result = await service.get('some invalid id').catch((e) => {
      expect(e).toBeDefined();
      expect(result).toBeUndefined();
      expect(persistence.get).toHaveBeenCalledTimes(1);
      done();
    });

    if (result !== undefined) {
      done('FAILED');
    }
  });

  it('should save a product', async () => {
    const persistence = createPersistenceMockFactory();
    const service = new ProductService(persistence);

    const result = await service.create('Product test', 25.9);

    expect(persistence.save).toHaveBeenCalledTimes(1);
    expect(result).not.toBe(null);
    expect(result.getName()).toBe('Product test');
    expect(result.getPrice()).toBe(25.9);
  });

  it('should not save a product', async () => {
    const persistence = createPersistenceMockFactory();
    persistence.save = jest.fn((product) => null);
    const service = new ProductService(persistence);

    const result = await service.create('Product test', 25.9);

    expect(persistence.save).toHaveBeenCalledTimes(1);
    expect(result).toBe(null);
  });

  it('should not save a product if invalid', async (done) => {
    const persistence = createPersistenceMockFactory();
    const service = new ProductService(persistence);

    const result = await service.create('Product test', -25.9).catch((e: ProductCreationError) => {
      expect(persistence.save).toHaveBeenCalledTimes(0);
      expect(result).toBe(undefined);
      expect(e.getErrors().length).toBeGreaterThan(0);
      expect(e).toBeInstanceOf(ProductCreationError);
      done();
    });

    if (result !== undefined) {
      done('FAILED');
    }
  });

  it('should enable a product', async (done) => {
    const persistence = createPersistenceMockFactory();
    const service = new ProductService(persistence);
    const product = ProductFactory.createNewProduct();
    product.setPrice(22.9);
    const result = await service.enable(product);

    expect(persistence.save).toHaveBeenCalledTimes(1);
    expect(result).not.toBe(null);
    expect(result.getStatus()).toBe(ProductStatus.ENABLED);
    done();
  });
  it('should not enable a product if invalid', async (done) => {
    const persistence = createPersistenceMockFactory();
    const service = new ProductService(persistence);
    const product = ProductFactory.createNewProduct();
    const result = await service.enable(product);

    expect(persistence.save).toHaveBeenCalledTimes(0);
    expect(result).toBe(null);
    done();
  });

  it('should disable a product', async (done) => {
    const persistence = createPersistenceMockFactory();
    const service = new ProductService(persistence);
    const product = ProductFactory.createNewProduct();
    product.setPrice(22.9);
    product.enable();
    product.setPrice(0);
    const result = await service.disable(product);

    expect(persistence.save).toHaveBeenCalledTimes(1);
    expect(result).not.toBe(null);
    expect(result.getStatus()).toBe(ProductStatus.DISABLED);
    done();
  });
  it('should not disable a product if invalid', async (done) => {
    const persistence = createPersistenceMockFactory();
    const service = new ProductService(persistence);
    const product = ProductFactory.createNewProduct();
    product.setPrice(22.9);
    product.enable();
    const result = await service.disable(product);

    expect(persistence.save).toHaveBeenCalledTimes(0);
    expect(result).toBe(null);
    done();
  });
});
