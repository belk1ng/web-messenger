class WebSocketClient {
  public socket: WebSocket | null = null;

  public connect(url: string) {
    if (!this.socket) {
      this.socket = new WebSocket(url);
    }
  }

  public disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  public send(message: Record<string, string>) {
    if (this.socket) {
      this.socket.send(JSON.stringify(message));
    }
  }

  public on(eventName: string, callback: EventListenerOrEventListenerObject) {
    if (this.socket) {
      this.socket.addEventListener(eventName, callback);
    }
  }
}

export default WebSocketClient;
