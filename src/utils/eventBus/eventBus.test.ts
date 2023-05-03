import EventBus from "./eventBus";

describe("EventBus unit", () => {
  let bus: EventBus;

  beforeEach(() => {
    bus = new EventBus();
  });

  describe("init", () => {
    test("Should not be undefined", () => {
      expect(bus).not.toBe(undefined);
      expect(bus.listeners).toEqual({});
    });
  });

  describe(".on", () => {
    test("Should subscribe on events", () => {
      bus.on("logger", () => {
        console.log("Logger 1 called");
      });

      expect(bus.listeners.logger).toHaveLength(1);
    });

    test("Listeners[logger].length should be 3", () => {
      bus.on("logger", () => {
        console.log("Logger 1 called");
      });
      bus.on("logger", () => {
        console.log("Logger 2 called");
      });
      bus.on("logger", () => {
        console.log("Logger 3 called");
      });

      expect(bus.listeners.logger).toHaveLength(3);
    });

    test("Object.keys(listeners) should be 2", () => {
      bus.on("logger", () => {
        console.log("Logger 1 called");
      });
      bus.on("mounted", () => {
        console.log("mounted");
      });

      expect(Object.keys(bus.listeners)).toHaveLength(2);
    });
  });

  describe(".off", () => {
    test("Should unsubscribe from event and clear eventName key from listeners", () => {
      const _callback = () => console.log("logger called");

      bus.on("logger", _callback);
      bus.off("logger", _callback);

      expect(bus.listeners.logger).toBeUndefined();
    });

    test("Should unsubscribe from event", () => {
      const _callback = () => console.log("logger called");

      bus.on("logger", _callback);
      bus.on("logger", () => console.log("called logger 2"));
      bus.off("logger", _callback);

      expect(bus.listeners.logger).toHaveLength(1);
    });

    test("Should return when unsubscribing from not exist event", () => {
      const response = bus.off("logger", () => console.log("Logger called"));

      expect(response).toBeUndefined();
    });
  });

  describe(".emit", () => {
    test("Should be called every listener by event name", () => {
      bus.on("logger", () => {
        console.log("Logger 1 called");
      });
      bus.on("logger", () => {
        console.log("Logger 2 called");
      });

      bus.listeners.logger = bus.listeners.logger.map(() => jest.fn());

      const [log1, log2] = bus.listeners.logger;

      bus.emit("logger");

      expect(log1).toHaveBeenCalledTimes(1);
      expect(log2).toHaveBeenCalledTimes(1);
    });

    test("Should return when event not exist", () => {
      const response = bus.emit("event-not-exist");

      expect(response).toBeUndefined();
    });
  });

  describe(".reset", () => {
    test("Should reset bus listeners", () => {
      bus.on("logger", () => {
        console.log("Logger 1 called");
      });
      bus.on("logger", () => {
        console.log("Logger 2 called");
      });
      bus.reset();

      expect(bus.listeners).toEqual({});
    });
  });
});
