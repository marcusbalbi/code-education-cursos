import SendEmailWhenProductIsCreatedHandler from "../event/product/handler/send-email-when-product-is-created.handler";
import EventDispatcher from "./event-dispatcher";

describe("Domain Events tests", () => {

  test("Register an event Handler", () => {
    const dispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    dispatcher.register("ProductCreatedEvent", eventHandler);

    expect(dispatcher.getEventHandlers("ProductCreatedEvent")).toBeDefined();
    expect(dispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(1);
  })
})