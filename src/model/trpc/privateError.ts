export class PrivateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PrivateError";
  }
}
