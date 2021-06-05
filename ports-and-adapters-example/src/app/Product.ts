import * as yup from 'yup';
export interface ProductInterface {
  isValid(): ProductValidationResult;
  enable(): void;
  disable(): void;
  getID(): String;
  getName(): String;
  getStatus(): String;
  getPrice(): Number;
}

export interface ProductValidationResult {
  errors: Array<String>;
  valid: Boolean;
}

export enum ProductStatus {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
}

export class Product implements ProductInterface {
  private id: String;
  private name: String;
  private status: ProductStatus;
  private price: Number;
  private validationSchema: yup.AnySchema;

  constructor(name: String = '') {
    this.name = name;
    this.validationSchema = this.defineValidationSchema();
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
      this.validationSchema.validateSync(this, { abortEarly: false });
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
  getID(): String {
    return this.id;
  }

  setID(value): void {
    this.id = value;
  }

  getName(): String {
    return this.name;
  }

  setName(value): void {
    this.name = value;
  }

  getStatus(): String {
    return this.status;
  }

  getPrice(): Number {
    return this.price;
  }

  setPrice(value): void {
    this.price = value;
  }
}
