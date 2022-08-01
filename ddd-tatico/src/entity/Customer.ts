export class Customer {
  _id: string;
  _name: string;
  _address: string;
  _active: boolean = true;

  constructor (id: string, name: string, address: string) {
    this._id = id;
    this._name = name;
    this._address = address;
  }

  // maior expressividade no nome do metodo
  // indica uma intensão de negócio
  changeName(name: string): void {
    this._name = name;
  }

  activate() {
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }
}