import { Notification } from "./notification";

describe("Unit test for notification", () => {
  it("should create errors", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };
    notification.addError(error);
    expect(notification.messages("customer")).toBe("customer: error message");

    const error2 = {
      message: "error message 2",
      context: "customer",
    };

    notification.addError(error2);
    expect(notification.messages("customer")).toBe(
      "customer: error message, customer: error message 2"
    );

    const error3 = {
      message: "error message 3",
      context: "order",
    };

    notification.addError(error3);
    expect(notification.messages("customer")).toBe(
      "customer: error message, customer: error message 2"
    );
    expect(notification.messages("order")).toBe("order: error message 3");

    expect(notification.messages()).toBe(
      "customer: error message, customer: error message 2, order: error message 3"
    );
  });

  it("should has error", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };
    notification.addError(error);

    expect(notification.hasErrors()).toBe(true);

  })
  it("should get error", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };
    notification.addError(error);

    expect(notification.getErrors()).toEqual([error]);
  })

  it("should throwErrors", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };
    notification.addError(error);

    expect(notification.throwErrors).toThrow();
  });
});
