import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 200,
  message: {
    success: false,
    error: "Too many requests. Please try again later.",
    body: null,
  },
});
