import { NotificationErrorProps } from "./notification";

export class NotificationError extends Error {
  constructor(public errors: NotificationErrorProps[]) {
    super();
    this.name = "NotificationError";
  }
}