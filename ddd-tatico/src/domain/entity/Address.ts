export class Address {
  readonly _street: string;
  readonly _number: number;
  readonly _zip: string;
  readonly _city: string;

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;

    this.validate();
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
