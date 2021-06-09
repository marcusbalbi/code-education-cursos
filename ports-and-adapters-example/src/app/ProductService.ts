import {
  ProductFactory,
  ProductInterface,
  ProductPersistenceInterface,
  ProductServiceInterface,
} from './Product';

export class ProductService implements ProductServiceInterface {
  constructor(private persistence: ProductPersistenceInterface) {}

  async get(id: String): Promise<ProductInterface> {
    const product = await this.persistence.get(id);

    if (!product) {
      return null;
    }
    return product;
  }

  async create(name: String, price: Number): Promise<ProductInterface> {
    const product = ProductFactory.createNewProduct();
    product.setName(name);
    product.setPrice(price);

    if (product.isValid()) {
      return this.persistence.save(product);
    }

    return null;
  }

  enable(product: ProductInterface): Promise<ProductInterface> {
    throw new Error('Method not implemented.');
  }

  disable(product: ProductInterface): Promise<ProductInterface> {
    throw new Error('Method not implemented.');
  }
}
