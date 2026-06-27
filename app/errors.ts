// --- Custom API Errors ---

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class ValidationError extends ApiError {
  constructor(message: string) {
    super(400, message, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}

export class AuthError extends ApiError {
  constructor(message: string = "Unauthorized. Provide a valid Bearer token.") {
    super(401, message, "AUTH_ERROR");
    this.name = "AuthError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Resource not found") {
    super(404, message, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export class RenderError extends ApiError {
  constructor(message: string) {
    super(502, message, "RENDER_ERROR");
    this.name = "RenderError";
  }
}

export class AWSError extends ApiError {
  constructor(message: string) {
    super(503, message, "AWS_ERROR");
    this.name = "AWSError";
  }
}
