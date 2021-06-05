interface ProductInterface {
  isValid(): boolean;
  enable(): void;
  disable(): void;
  getID(): String;
  getName(): String;
  getStatus(): String;
  getPrice(): Number;
}

export class Product implements ProductInterface {
  private id: String;
  private status: 'enabled' | 'disabled' = 'disabled';
  private price = 0;
  constructor(private name: String) {}

  isValid(): boolean {
    throw new Error('Method not implemented.');
  }
  enable(): void {
    if (this.price <= 0) {
      throw new Error('The price must be greater than 0 to enable the product');
    }
    this.status = 'enabled';
  }
  disable(): void {
    if (this.price === 0) {
      this.status = 'disabled';
    } else {
      throw new Error('The price must be zero  in order to disable the product');
    }
  }
  getID(): String {
    return this.id;
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
