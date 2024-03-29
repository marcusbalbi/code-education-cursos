export class Address {
  private readonly _street: string;
  private readonly _number: number;
  private readonly _zip: string;
  private readonly _city: string;

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;

    this.validate();
  }

  get street() {
    return this._street;
  }
  get number() {
    return this._number;
  }
  get zip() {
    return this._zip;
  }
  get city() {
    return this._city;
  }

  validate() {
    if (this._street.length === 0) { throw new Error("Invalid Street name"); }
    if (this._number <= 0) { throw new Error("Invalid number"); }
    if (this._zip.length === 0) { throw new Error("Invalid zip"); }
    if (this._city.length === 0) { throw new Error("Invalid City name"); }
  }

  toString(): string {
    return `${this._street}, ${this._number} - ${this._city} - ${this._zip}`;
  }
}
