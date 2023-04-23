import { NotificationErrorProps } from "./notification";

export class NotificationError extends Error {
  constructor(public errors: NotificationErrorProps[], message?: string) {
    super();
    this.name = "NotificationError";
    this.message = message || `${errors.length} found!`
  }
}