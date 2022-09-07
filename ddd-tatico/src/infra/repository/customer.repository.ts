import { Address } from "../../domain/entity/Address";
import { Customer } from "../../domain/entity/Customer";
import CustomerRepositoryInterface from "../../domain/repository/customer.repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      rewardPoints: entity.rewardPoints,
      active: entity.isActive(),
      street: entity.address?.street,
      number: entity.address?.number,
      zip: entity.address?.zip,
      city: entity.address?.city,
    });
  }
  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        rewardPoints: entity.rewardPoints,
        active: entity.isActive(),
        street: entity.address?.street,
        number: entity.address?.number,
        zip: entity.address?.zip,
        city: entity.address?.city,
      },
      {
        where: { id: entity.id },
      }
    );
  }
  async find(id: string): Promise<Customer | null> {
    const model = await CustomerModel.findOne({ where: { id } });
    if (!model) return null;

    const customer = new Customer(model.id, model.name);
    customer.defineAddress(
      new Address(model.street, model.number, model.zip, model.city)
    );
    customer.addRewardPoints(model.rewardPoints);

    if (model.active) {
      customer.activate();
    }

    return customer;
  }
  async findAll(): Promise<Customer[]> {
    const customer = await CustomerModel.findAll({});
    return customer.map((model) => {
      const customer = new Customer(model.id, model.name);
      customer.defineAddress(
        new Address(model.street, model.number, model.zip, model.city)
      );
      customer.addRewardPoints(model.rewardPoints);
      return customer;
    });
  }
}
