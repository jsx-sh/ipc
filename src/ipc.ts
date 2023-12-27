export class IpcMessenger {
  protected readonly incomingMessages = new Map<
    string,
    Record<string, unknown>[]
  >();

  public onMessage(app: string, message: Record<string, unknown>): void {
    const messages = this.incomingMessages.get(app) ?? [];
    messages.push(message);
    this.incomingMessages.set(app, messages);
  }

  public waitForMessageWithTimeout<
    ResponseType = Record<string, unknown>,
  >(
    app: string,
    type: string,
    timeout = 5000,
  ): Promise<ResponseType> {
    return new Promise<ResponseType>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        reject(new Error(`Timeout waiting for message ${type}`));
      }, timeout);

      const intervalId = setInterval(() => {
        const messages = this.incomingMessages.get(app) ?? [];
        const message = messages.find((m) => m.type === type);

        if (message) {
          this.incomingMessages.set(
            app,
            messages.filter((m) => m.type !== type),
          );

          clearTimeout(timeoutId);
          clearInterval(intervalId);
          resolve(message as ResponseType);
        }
      }, 100);
    });
  }
}