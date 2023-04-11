import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";

export class FindCustomerUseCase {
  constructor(protected repository: CustomerRepositoryInterface) {}

  async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto | null> {
    const customer = await this.repository.find(input.id);
    if (!customer) return null;

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