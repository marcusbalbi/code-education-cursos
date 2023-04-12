import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";

import { Address } from "../../../domain/customer/entity/Address";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";

export class UpdateCustomerUseCase {
  constructor(protected repository: CustomerRepositoryInterface) {}

  async execute(
    input: InputUpdateCustomerDto
  ): Promise<OutputUpdateCustomerDto | null> {
    const customer = await this.repository.find(input.id);
    if (!customer) return null;

    customer.changeName(input.name);
    customer.defineAddress(
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city
      )
    );
    await this.repository.update(customer);

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
