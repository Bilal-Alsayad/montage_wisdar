import express from "express";
import cors from "cors";
import { authMiddleware } from "./middleware/auth";
import { rateLimiter } from "./middleware/rateLimiter";
import { errorHandler } from "./middleware/errorHandler";
import healthRoutes from "./routes/health.routes";
import renderRoutes from "./routes/render.routes";
import coverRoutes from "./routes/cover.routes";

const app = express();

// --- Global middleware ---
app.use(express.json());
app.use(cors());
app.use(rateLimiter);

// --- Auth middleware ---
app.use(authMiddleware);

// --- Routes ---
app.use(healthRoutes);
app.use(renderRoutes);
app.use(coverRoutes);

// --- Error handler (must be last) ---
app.use(errorHandler);

export default app;
