/**
 * Entidade deve representar o estado correto e atual
 * Construtor deve proteger e garantir que os dados estão corretos
 * metódos que alteram o estado interno da Entidade devem garantir que os dados estão em um estado consistente
 * Na Modelagem esquecer completamente "banco de dados"
 * Uma entidade deve se auto-validar para garantir sua consistencia interna
 */
export class Customer {
  _id: string;
  _name: string;
  _address: string = "";
  _active: boolean = false;

  constructor (id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  validate () {
    if(this._name.length === 0) {
      throw new Error("Invalid Name");
    }
    if (this._id.length === 0) {
      throw new Error("Invalid ID");
    }
  }

  // maior expressividade no nome do metodo
  // indica uma intensão de negócio
  changeName(name: string): void {
    this._name = name;
    this.validate(); // sem chance de ficar invalido
  }

  // expressando a regra de negócio
  activate() {
    if (this._address.length === 0) {
      throw new Error("Address is mandatory to activate customer")
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }
}