class CustomTrpcError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomTrpcError";
  }
}

export default CustomTrpcError;
