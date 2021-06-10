import {
  ProductFactory,
  ProductInterface,
  ProductPersistenceInterface,
  ProductServiceInterface,
} from './Product';

export class ProductService implements ProductServiceInterface {
  constructor(private persistence: ProductPersistenceInterface) {}

  async get(id: string): Promise<ProductInterface> {
    const product = await this.persistence.get(id);

    if (!product) {
      return null;
    }
    return product;
  }

  async create(name: string, price: number): Promise<ProductInterface> {
    const product = ProductFactory.createNewProduct();
    product.setName(name);
    product.setPrice(price);

    if (product.isValid().valid) {
      return this.persistence.save(product);
    }

    return null;
  }

  async enable(product: ProductInterface): Promise<ProductInterface> {
    try {
      product.enable();

      return this.persistence.save(product);
    } catch (e) {
      return null;
    }
  }

  disable(product: ProductInterface): Promise<ProductInterface> {
    try {
      product.disable();

      return this.persistence.save(product);
    } catch (e) {
      return null;
    }
  }
}
