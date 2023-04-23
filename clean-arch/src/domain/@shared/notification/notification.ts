import { cloneDeep } from "lodash";
import { NotificationError } from "./notification.error";

export type NotificationErrorProps = {
  message: string;
  context: string;
};

export class Notification {
  private errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  getErrors(): NotificationErrorProps[] {
    return cloneDeep(this.errors);
  }

  messages(context?: string): string {
    return this.errors
      .filter((e) => !context || e.context === context)
      .map((e) => `${e.context}: ${e.message}`)
      .join(", ");
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  throwErrors(context?: string) {
    throw new NotificationError(
      this.getErrors(),
      this.messages(context)
    );
  }

  // TODO throwWhenErrors: check and throw or do nothing
}
