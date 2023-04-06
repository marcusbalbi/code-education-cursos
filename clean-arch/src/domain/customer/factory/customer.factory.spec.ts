import { Address } from "../entity/Address";
import CustomerFactory from "./customer.factory";

describe("Customer factory tests", () => {
  test("should create a Customer", () => {
    const customer = CustomerFactory.create("Jhon");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Jhon");
    expect(customer.address).toBe(null);
  });
  test("should create a Customer with address", () => {
    const address = new Address("street", 2, '22222', "City");
    const customer = CustomerFactory.createWithAddress("Jhon", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Jhon");
    expect(customer.address).toBe(address);
  });
});
