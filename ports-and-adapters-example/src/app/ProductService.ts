import {
  ProductFactory,
  ProductInterface,
  ProductPersistenceInterface,
  ProductServiceInterface,
  ProductValidationResult,
} from './Product';

export class ProductCreationError extends Error {
  constructor(msg, private validationResult: ProductValidationResult) {
    super(msg);
    this.name = 'ProductCreationError';
    Object.setPrototypeOf(this, ProductCreationError.prototype);
  }

  getErrors() {
    return this.validationResult.errors;
  }
}

export class ProductService implements ProductServiceInterface {
  constructor(private persistence: ProductPersistenceInterface) {}

  async get(id: string): Promise<ProductInterface> {
    const product = await this.persistence.get(id);

    if (!product) {
      throw new Error('Product not Found!');
    }
    return product;
  }

  async create(name: string, price: number): Promise<ProductInterface> {
    const product = ProductFactory.createNewProduct();
    product.setName(name);
    product.setPrice(price);

    const validationResult = product.isValid();
    if (!validationResult.valid) {
      throw new ProductCreationError(
        'The product you are trying to create is not valid',
        validationResult,
      );
    }

    return this.persistence.save(product);
  }

  async enable(product: ProductInterface): Promise<ProductInterface> {
    try {
      product.enable();
      return this.persistence.save(product);
    } catch (e) {
      throw e;
    }
  }

  disable(product: ProductInterface): Promise<ProductInterface> {
    try {
      product.disable();
      return this.persistence.save(product);
    } catch (e) {
      throw e;
    }
  }
}
