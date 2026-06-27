import type { Response } from "express";

// --- Unified API response format ---
interface ApiResponse<T = unknown> {
  success: boolean;
  error: string | null;
  code?: string;
  body: T | null;
}

export function sendSuccess<T>(res: Response, body: T) {
  const response: ApiResponse<T> = {
    success: true,
    error: null,
    body,
  };
  res.json(response);
}

export function sendError(res: Response, message: string, code?: string) {
  const response: ApiResponse = {
    success: false,
    error: message,
    ...(code && { code }),
    body: null,
  };
  res.json(response);
}
