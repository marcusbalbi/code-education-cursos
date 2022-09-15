import crypto from "crypto";
import { Address } from "../entity/Address";
import { Customer } from "../entity/Customer";
import CustomerInterface from "../entity/customer.interface";
export default class CustomerFactory {

  static create(name: string): CustomerInterface {
    const id = crypto.randomUUID();
    return new Customer(id, name);
  }
  static createWithAddress(name: string, address: Address): CustomerInterface {
    const id = crypto.randomUUID();
    const customer = new Customer(id, name);
    customer.defineAddress(address);
    return customer;
  }
}
