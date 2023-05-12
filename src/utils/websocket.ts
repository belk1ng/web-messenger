class WebSocketClient {
  public socket: Nullable<WebSocket> = null;
  private _interval: Nullable<ReturnType<typeof setInterval>> = null;
  private static readonly PING_INTERVAL = 5000;

  public connect(url: string) {
    this.socket = new WebSocket(url);

    this._interval = setInterval(() => {
      this.send("ping");
    }, WebSocketClient.PING_INTERVAL);

    return this;
  }

  public disconnect() {
    if (this.socket) {
      this._clearPingInterval();

      this.socket.close();
      this.socket = null;
    }
  }

  public on(eventName: string, callback: EventListener) {
    if (this.socket) {
      this.socket.addEventListener(eventName, callback);
    }
  }

  private _clearPingInterval() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }

  private _prepareSocketContent(obj: Record<string, string>) {
    return JSON.stringify(obj);
  }

  public send(type: "message" | "get old" | "ping", content?: string) {
    if (this.socket && content) {
      this.socket.send(this._prepareSocketContent({ type, content }));
    } else if (this.socket) {
      this.socket?.send(this._prepareSocketContent({ type }));
    }
  }
}

export default WebSocketClient;
