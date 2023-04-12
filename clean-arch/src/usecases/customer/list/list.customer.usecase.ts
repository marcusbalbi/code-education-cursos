import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";

import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";
import { Customer } from "../../../domain/customer/entity/Customer";

export class ListCustomerUseCase {
  constructor(protected repository: CustomerRepositoryInterface) {}

  private toOutput (customer: Customer) {
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

  async execute(
    input: InputListCustomerDto
  ): Promise<OutputListCustomerDto> {
    const customers = await this.repository.findAll();

    return {
      customers: customers.map(c => this.toOutput(c))
    }
  }
}
