import { ProductInterface, ProductPersistenceInterface, ProductServiceInterface } from './Product';

export class ProductService implements ProductServiceInterface {
  constructor(private persistence: ProductPersistenceInterface) {}

  async get(id: String): Promise<ProductInterface> {
    const product = await this.persistence.get(id);

    if (!product) {
      return null;
    }
    return product;
  }
  create(name: String, price: Number): Promise<ProductInterface> {
    throw new Error('Method not implemented.');
  }
  enable(product: ProductInterface): Promise<ProductInterface> {
    throw new Error('Method not implemented.');
  }
  disable(product: ProductInterface): Promise<ProductInterface> {
    throw new Error('Method not implemented.');
  }
}
