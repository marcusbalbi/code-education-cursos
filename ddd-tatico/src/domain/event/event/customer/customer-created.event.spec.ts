import { Address } from "../../../entity/Address";
import { Customer } from "../../../entity/Customer";
import EventDispatcher from "../../@shared/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLogCustomerChangedAddressHandler from "./handler/send-console-log-customer-changed-address.handler";
import SendConsoleLogCustomerCreated1Handler from "./handler/send-console-log-customer-created-1.handler";
import SendConsoleLogCustomerCreated2Handler from "./handler/send-console-log-customer-created-2.handler";

describe("Customer created event tests", () => {
  beforeEach(() => {
    EventDispatcher.getInstance().unregisterAll();
  });
  test("should notify correctly", () => {
    const dispatcher = EventDispatcher.getInstance();
    const handler1 = new SendConsoleLogCustomerCreated1Handler();
    const handler2 = new SendConsoleLogCustomerCreated2Handler();
    const spyHandler1 = jest.spyOn(handler1, "handle");
    const spyHandler2 = jest.spyOn(handler2, "handle");
    dispatcher.register(CustomerCreatedEvent.name, handler1);
    dispatcher.register(CustomerCreatedEvent.name, handler2);

    dispatcher.notify(
      new CustomerCreatedEvent({
        id: "c1",
      })
    );

    expect(spyHandler1).toHaveBeenCalled();
    expect(spyHandler2).toHaveBeenCalled();
  });

  test("should notify when customer is created", () => {
    const dispatcher = EventDispatcher.getInstance();
    const handler1 = new SendConsoleLogCustomerCreated1Handler();
    const handler2 = new SendConsoleLogCustomerCreated2Handler();
    const spyHandler1 = jest.spyOn(handler1, "handle");
    const spyHandler2 = jest.spyOn(handler2, "handle");
    dispatcher.register(CustomerCreatedEvent.name, handler1);
    dispatcher.register(CustomerCreatedEvent.name, handler2);

    const customer = new Customer("c2", "Jhon DOe");

    expect(spyHandler1).toHaveBeenCalled();
    expect(spyHandler2).toHaveBeenCalled();
  });
});
