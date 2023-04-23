import { cloneDeep } from "lodash";

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
}
