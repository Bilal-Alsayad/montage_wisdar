import type { Request, Response, NextFunction } from "express";
import { ApiError, AWSError } from "../errors";
import { sendError } from "../utils/response";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  // Known API errors
  if (err instanceof ApiError) {
    console.error(`[${err.code}] ${err.message}`);
    sendError(res, err.message, err.code);
    return;
  }

  // AWS / Lambda errors
  if (
    err.name === "AccessDeniedException" ||
    err.name === "CredentialsProviderError"
  ) {
    console.error("[AWS_ERROR]", err);
    const awsErr = new AWSError(
      "AWS credentials error. Check your configuration.",
    );
    sendError(res, awsErr.message, awsErr.code);
    return;
  }

  // Unknown errors
  console.error("[UNKNOWN_ERROR]", err);
  sendError(res, "Internal server error", "INTERNAL_ERROR");
}
