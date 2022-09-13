import SendEmailWhenProductIsCreatedHandler from "../event/product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../event/product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain Events tests", () => {

  beforeEach(() => {
    const dispatcher = EventDispatcher.getInstance();
    dispatcher.unregisterAll();
  });

  test("Register an event Handler", () => {
    const dispatcher = EventDispatcher.getInstance();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    dispatcher.register("ProductCreatedEvent", eventHandler);

    expect(dispatcher.getEventHandlers("ProductCreatedEvent")).toBeDefined();
    expect(dispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(1);
    expect(dispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(
      eventHandler
    );
  });

  test("unregister an event", () => {
    const dispatcher = EventDispatcher.getInstance();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    dispatcher.register("ProductCreatedEvent", eventHandler);

    expect(dispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(1);

    dispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(dispatcher.getEventHandlers("ProductCreatedEvent")).toBeDefined();
    expect(dispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(0);
  });

  test("unregister all events", () => {
    const dispatcher = EventDispatcher.getInstance();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    dispatcher.register("ProductCreatedEvent", eventHandler);

    expect(dispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(1);

    dispatcher.unregisterAll();

    expect(dispatcher.getEventHandlers("ProductCreatedEvent")).toBeUndefined();
  });

  test("should notify all event handlers", () => {
    const dispatcher = EventDispatcher.getInstance();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    dispatcher.register("ProductCreatedEvent", eventHandler);

    expect(dispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(1);

    const productCreatedEvent = new ProductCreatedEvent({ email: 'jhondoe@gmail.com' });

    dispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();

  });
});
