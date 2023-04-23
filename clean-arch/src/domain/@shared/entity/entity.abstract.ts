import { Notification } from "../notification/notification";

export abstract class BaseEntity {
  protected notification: Notification;
  constructor() {
    this.notification = new Notification();
  }
}