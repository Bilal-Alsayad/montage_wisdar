import type { Request, Response, NextFunction } from "express";
import { env } from "../config/env";
import { AuthError } from "../errors";

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  if (!env.apiKey) {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${env.apiKey}`) {
    return next(new AuthError());
  }

  next();
}
