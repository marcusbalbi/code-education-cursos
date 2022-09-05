import { Address } from "./Address";

/**
 * Entidade deve representar o estado correto e atual
 * Construtor deve proteger e garantir que os dados estão corretos
 * metódos que alteram o estado interno da Entidade devem garantir que os dados estão em um estado consistente
 * Na Modelagem esquecer completamente "banco de dados"
 * Uma entidade deve se auto-validar para garantir sua consistencia interna
 * ORMs pedem uma entidade, mas essa é focada em persistencia
 * a Entidade do DDD é focada em Regras de Negócio, podemos dar outro nome na entidade do ORM para não gerar confusão
 */


/**
 *  Complexidade de Negócio
 * Domain
 *  - Entity
 *      Customer ( Regras de Negocio)
 * 
 * Complexidade Acidental
 * Infra
 *  - Entity/Model
 *      Customer (getters e setters)
 */

export class Customer {
  private _id: string;
  private _name: string;
  private _address: Address | null = null;
  private _active: boolean = false;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get id () {
    return this._id;
  }

  defineAddress(addr: Address) {
    this._address = addr;
  }

  validate() {
    if (this._name.length === 0) {
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
    if (!this._address) {
      throw new Error("Address is mandatory to activate customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  get name() {
    return this._name;
  }

  isActive() {
    return this._active;
  }
}