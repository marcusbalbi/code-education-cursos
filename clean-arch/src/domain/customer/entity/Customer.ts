import { BaseEntity } from "../../@shared/entity/entity.abstract";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import { NotificationError } from "../../@shared/notification/notification.error";
import CustomerChangedAddressEvent from "../event/customer-changed-address.event";
import CustomerCreatedEvent from "../event/customer-created.event";
import { CustomerValidatorFactory } from "../factory/customer.validator.factory";
import { Address } from "./Address";
import CustomerInterface from "./customer.interface";

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

export class Customer extends BaseEntity implements CustomerInterface {
  private _id: string;
  private _name: string;
  private _address: Address | null = null;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();
    EventDispatcher.getInstance().notify(
      new CustomerCreatedEvent({ id: this._id })
    );
  }

  get address(): Address | null {
    return this._address;
  }

  defineAddress(addr: Address) {
    this._address = addr;
    EventDispatcher.getInstance().notify(
      new CustomerChangedAddressEvent({
        id: this._id,
        name: this.name,
        address: this.address,
      })
    );
  }

  validate() {
    CustomerValidatorFactory.create().validate(this);
    if (this.notification.hasErrors()) {
      this.notification.throwErrors("customer")
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

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  isActive() {
    return this._active;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  addRewardPoints(points: number) {
    if (points <= 0) {
      throw new Error("points should be a positive value");
    }
    this._rewardPoints += points;
  }
}
