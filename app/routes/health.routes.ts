import { Router } from "express";
import { env } from "../config/env";
import { sendSuccess } from "../utils/response";
import { renderQueue } from "./render.routes";

const router = Router();

router.get("/health", (_req, res) => {
  sendSuccess(res, {
    status: "ok",
    region: env.remotion.region,
    functionName: env.remotion.functionName,
    queue: {
      active: renderQueue.activeCount,
      pending: renderQueue.pendingCount,
      maxConcurrent: env.maxConcurrentRenders,
    },
  });
});

export default router;
