import { Address } from "./Address";
import { Customer } from "./Customer";

describe("Customer unit tests", () => {
  test("should throw error when id is empty", () => {
    expect(() => {
      return new Customer("", "Jhon");
    }).toThrowError();
  });
  test("should throw error when name is empty", () => {
    expect(() => {
      return new Customer("1", "");
    }).toThrowError();
  });
  test("should throw error change name to an empty name", () => {
    expect(() => {
      const customer = new Customer("1", "Jhon");
      customer.changeName("");
    }).toThrowError();
  });
  test("should change name", () => {
    const customer = new Customer("1", "Jhon");
    customer.changeName("Joe");
    expect(customer.name).toBe("Joe");
  });
  test("should activate customer", () => {
    const customer = new Customer("1", "Jhon");
    const address = new Address("Alameda abc", 12, "28625000", "Nova Friburgo");
    customer.defineAddress(address);
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });
  test("should throw error when activate customer without address", () => {
    const customer = new Customer("1", "Jhon");
    expect(() => {
      customer.activate();
    }).toThrowError();
  });
  test("should deactivate customer", () => {
    const customer = new Customer("1", "Jhon");
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });
});
