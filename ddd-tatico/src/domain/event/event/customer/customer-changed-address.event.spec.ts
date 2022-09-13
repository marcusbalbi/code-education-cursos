import { Address } from "../../../entity/Address";
import { Customer } from "../../../entity/Customer";
import EventDispatcher from "../../@shared/event-dispatcher";
import CustomerChangedAddressEvent from "./customer-changed-address.event";
import SendConsoleLogCustomerChangedAddressHandler from "./handler/send-console-log-customer-changed-address.handler";

describe("Customer changed address event tests", () => {
  beforeEach(() => {
    EventDispatcher.getInstance().unregisterAll();
  });
  test("should notify correctly", () => {
    const dispatcher = EventDispatcher.getInstance();
    const handler = new SendConsoleLogCustomerChangedAddressHandler();
    const spyHandler = jest.spyOn(handler, "handle");
    dispatcher.register(CustomerChangedAddressEvent.name, handler);

    dispatcher.notify(
      new CustomerChangedAddressEvent({
        id: "c1",
        name: "Jon Doe",
        address: new Address("street", 2, "28555444", "Rio de Janeiro"),
      })
    );

    expect(spyHandler).toHaveBeenCalled();
  });

  test("should notify when address is changed", () => {
    const dispatcher = EventDispatcher.getInstance();
    const handler = new SendConsoleLogCustomerChangedAddressHandler();
    const spyHandler = jest.spyOn(handler, "handle");
    dispatcher.register(CustomerChangedAddressEvent.name, handler);

    const customer = new Customer('c2', 'Jhon DOe');
    customer.defineAddress(new Address('street', 2, '222333444', 'Rio de Janeiro'));

    expect(spyHandler).toHaveBeenCalled();

  });
});
