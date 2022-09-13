import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import eventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

  notify(event: eventInterface): void {
    throw new Error("Method not implemented.");
  }
  register(
    eventName: string,
    eventHandler: EventHandlerInterface<eventInterface>
  ): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventHandler);
  }
  unregister(
    eventName: string,
    eventHandler: EventHandlerInterface<eventInterface>
  ): void {
    throw new Error("Method not implemented.");
  }
  unregisterAll(): void {
    this.eventHandlers = {};
  }

  getEventHandlers(eventName: string): EventHandlerInterface[] {
    return this.eventHandlers[eventName];
  }
}
