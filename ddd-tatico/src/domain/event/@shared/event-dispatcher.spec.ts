import SendEmailWhenProductIsCreatedHandler from "../event/product/handler/send-email-when-product-is-created.handler";
import EventDispatcher from "./event-dispatcher";

describe("Domain Events tests", () => {

  test("Register an event Handler", () => {
    const dispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    dispatcher.register("ProductCreatedEvent", eventHandler);

    expect(dispatcher.getEventHandlers("ProductCreatedEvent")).toBeDefined();
    expect(dispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(1);
    expect(dispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);
  });

  test('unregister an event', () => {
    const dispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    dispatcher.register("ProductCreatedEvent", eventHandler);

    expect(dispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(1);

    dispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(dispatcher.getEventHandlers("ProductCreatedEvent")).toBeDefined();
    expect(dispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(0);
  });

  test('unregister all events', () => {
    const dispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    dispatcher.register("ProductCreatedEvent", eventHandler);

    expect(dispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(1);

    dispatcher.unregisterAll();

    expect(dispatcher.getEventHandlers("ProductCreatedEvent")).toBeUndefined();
  })
})