import { Customer } from "../../../domain/customer/entity/Customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import { v4 as uuid } from "uuid"
import { Address } from "../../../domain/customer/entity/Address";

export class CreateCustomerUseCase {
  constructor(protected repository: CustomerRepositoryInterface) {}

  async execute(
    input: InputCreateCustomerDto
  ): Promise<OutputCreateCustomerDto | null> {
    const id = uuid()
    const customer = new Customer(id, input.name);
    customer.defineAddress(new Address(input.address.street, input.address.number, input.address.zip, input.address.city))
    await this.repository.create(customer)

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address?.street,
        city: customer.address?.city,
        number: customer.address?.number,
        zip: customer.address?.zip,
      },
    };
  }
}