import * as yup from 'yup';
import { v4 as uuidV4 } from 'uuid';
export interface ProductInterface {
  isValid(): ProductValidationResult;
  enable(): void;
  disable(): void;
  getID(): string;
  getName(): string;
  getStatus(): string;
  getPrice(): number;
  setPrice(newPrice: number): void;
}

export interface ProductServiceInterface {
  get(id: string): Promise<ProductInterface>;
  create(name: string, price: number): Promise<ProductInterface>;
  enable(product: ProductInterface): Promise<ProductInterface>;
  disable(product: ProductInterface): Promise<ProductInterface>;
}

export interface ProductReader {
  get(id: string): Promise<ProductInterface>;
}

export interface ProductWriter {
  save(product: ProductInterface): Promise<ProductInterface>;
}

export interface ProductPersistenceInterface extends ProductReader, ProductWriter {}

export interface ProductValidationResult {
  errors: Array<string>;
  valid: boolean;
}

export enum ProductStatus {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
}

export class Product implements ProductInterface {
  private id: string;
  private name: string;
  private status: ProductStatus;
  private price: number;

  constructor(name: string = '') {
    this.name = name;
  }

  private defineValidationSchema() {
    return yup.object().shape({
      name: yup.string().required(),
      id: yup.string().uuid().required(),
      price: yup.number().required(),
      status: yup.string().required(),
    });
  }

  isValid(): ProductValidationResult {
    const validationSchema = this.defineValidationSchema();
    const validationResult: ProductValidationResult = { valid: true, errors: [] };
    if (this.price < 0) {
      validationResult.errors.push('Price must be a positive value or zero');
      validationResult.valid = false;
    }

    if (this.status !== 'enabled' && this.status !== 'disabled') {
      validationResult.errors.push('Status must be string enabled or disabled');
      validationResult.valid = false;
    }

    try {
      validationSchema.validateSync(this, { abortEarly: false });
    } catch (err) {
      validationResult.valid = false;
      validationResult.errors = validationResult.errors.concat(err.errors);
    }

    return validationResult;
  }
  enable(): void {
    if (!this.price || this.price <= 0) {
      throw new Error('The price must be greater than 0 to enable the product');
    }
    this.status = ProductStatus.ENABLED;
  }
  disable(): void {
    if (this.price === 0) {
      this.status = ProductStatus.DISABLED;
    } else {
      throw new Error('The price must be zero  in order to disable the product');
    }
  }
  getID(): string {
    return this.id;
  }

  setID(value): void {
    this.id = value;
  }

  getName(): string {
    return this.name;
  }

  setName(value): void {
    this.name = value;
  }
  setStatus(value): void {
    if (value === ProductStatus.ENABLED) {
      this.enable();
    } else if (value === ProductStatus.DISABLED) {
      this.disable();
    } else {
      throw new Error('Invalid Status!');
    }
  }

  getStatus(): string {
    return this.status;
  }

  getPrice(): number {
    return this.price;
  }

  setPrice(value): void {
    this.price = value;
  }
}

export class ProductFactory {
  public static createNewProduct(name: string = '', price: number = 0): Product {
    const product = new Product(name);
    product.setID(uuidV4());
    product.setPrice(price);
    product.disable();
    return product;
  }
  public static create({
    id,
    name,
    price,
    status,
  }: {
    id: string;
    name: string;
    price: number;
    status: string;
  }): Product {
    const product = new Product();
    product.setID(id);
    product.setName(name);
    product.setPrice(price);
    product.setStatus(status);

    return product;
  }
}
