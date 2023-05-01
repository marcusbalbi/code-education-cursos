import { Notification } from "../notification/notification";

export abstract class BaseEntity {
  public notification: Notification;
  constructor() {
    this.notification = new Notification();
  }
}