/**
 * Entidade Anêmica <> Classe que carrega regras de negocio
 */
export class Customer {
  _id: string;
  _name: string;
  _address: string;

  constructor (id: string, name: string, address: string) {
    this._id = id;
    this._name = name;
    this._address = address;
  }

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get address() {
    return this._address;
  }

  set name(v: string) {
    this._name = v;
  }
  set id(v: string) {
    this._id = v;
  }
  set address(v: string) {
    this._address = v;
  }
}