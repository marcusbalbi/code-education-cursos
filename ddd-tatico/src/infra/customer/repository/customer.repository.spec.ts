import { Sequelize } from "sequelize-typescript";
import { Address } from "../../../domain/customer/entity/Address";
import { Customer } from "../../../domain/customer/entity/Customer";
import CustomerModel from "../sequelize/customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer Repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const c1 = new Customer("1", "Joe Doe");
    c1.defineAddress(new Address("Rua souza Cardoso", 12, "28625000", "Nova Friburgo"));
    c1.addRewardPoints(10);
    c1.activate();
    await customerRepository.create(c1);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "Joe Doe",
      rewardPoints: 10,
      active: true,
      street: "Rua souza Cardoso",
      number: 12,
      zip: "28625000",
      city: "Nova Friburgo",
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const c1 = new Customer("1", "Joe Doe");
    c1.defineAddress(new Address("Rua souza Cardoso", 12, "28625000", "Nova Friburgo"));
    c1.addRewardPoints(10);
    c1.activate();
    await customerRepository.create(c1);

    c1.defineAddress(new Address("Av. rui Barbosa", 25, "28625000", "Nova Friburgo"))

    await customerRepository.update(c1);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "Joe Doe",
      rewardPoints: 10,
      active: true,
      street: "Av. rui Barbosa",
      number: 25,
      zip: "28625000",
      city: "Nova Friburgo",
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const c1 = new Customer("1", "Joe Doe");
    c1.defineAddress(
      new Address("Rua souza Cardoso", 12, "28625000", "Nova Friburgo")
    );
    c1.addRewardPoints(10);
    c1.activate();
    await customerRepository.create(c1);

    const saved = await customerRepository.find(c1.id);

    expect(saved?.id).toBe(c1.id);
    expect(saved?.name).toBe(c1.name);
    expect(saved?.rewardPoints).toBe(c1.rewardPoints);
    expect(saved?.isActive()).toBe(c1.isActive());
  });
  it('should return null if customer not found', async () => {
    const customerRepository = new CustomerRepository();
    const model = await customerRepository.find("22222");
    expect(model).toBeNull();
  })
  it("should findAll customers", async () => {
    const customerRepository = new CustomerRepository();
    const c1 = new Customer("1", "Joe Doe");
    c1.defineAddress(
      new Address("Rua souza Cardoso", 12, "28625000", "Nova Friburgo")
    );
    c1.addRewardPoints(10);
    c1.activate();

    const c2 = new Customer("2", "Jane Doe");
    c2.defineAddress(
      new Address("Rua souza Cardoso", 12, "28625000", "Nova Friburgo")
    );
    c2.addRewardPoints(10);
    c2.activate();
    await customerRepository.create(c1);
    await customerRepository.create(c2);

    const customers = await customerRepository.findAll();

    expect(customers.length).toBe(2);
  });
});
