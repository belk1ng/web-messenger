type EventName = string;
type EventBusListener = (...args: unknown[]) => void;

class EventBus {
  listeners: Record<EventName, EventBusListener[]>;

  constructor() {
    this.listeners = {};
  }

  public on(event: EventName, callback: EventBusListener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  public off(event: EventName, callback: EventBusListener) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );

    if (this.listeners[event].length === 0) {
      delete this.listeners[event];
    }
  }

  public emit(event: EventName, ...args: unknown[]) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach((listener) => listener(...args));
  }

  public reset() {
    this.listeners = {};
  }
}

export default EventBus;
