import EventInterface from "../../@shared/event/event.interface";

export default class ProductCreatedEvent implements EventInterface {
  dateTimeOccured: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dateTimeOccured = new Date();
    this.eventData = eventData;
  }
}
