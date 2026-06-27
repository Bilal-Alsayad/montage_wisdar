import { Router } from "express";
import { triggerRender, getRenderStatus } from "../services/render.service";
import { ValidationError } from "../errors";
import { sendSuccess } from "../utils/response";
import { ConcurrencyQueue } from "../utils/queue";
import { env } from "../config/env";

const router = Router();
export const renderQueue = new ConcurrencyQueue(env.maxConcurrentRenders);

// --- POST /render ---
router.post("/render", async (req, res, next) => {
  try {
    const { video_id, template, videoSrc, data, width, height } = req.body;

    // Validation
    if (video_id === undefined || video_id === null) {
      throw new ValidationError("video_id is required");
    }

    if (!template || typeof template !== "string") {
      throw new ValidationError("template is required and must be a string");
    }

    if (!videoSrc || typeof videoSrc !== "string") {
      throw new ValidationError("videoSrc is required and must be a string");
    }

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      throw new ValidationError("data is required and must be an object");
    }

    if (width !== undefined && (!Number.isInteger(width) || width <= 0)) {
      throw new ValidationError("width must be a positive integer");
    }

    if (height !== undefined && (!Number.isInteger(height) || height <= 0)) {
      throw new ValidationError("height must be a positive integer");
    }

    // Trigger Lambda render (through concurrency queue)
    const result = await renderQueue.run(() =>
      triggerRender({ video_id, template, videoSrc, data, width, height }),
    );

    sendSuccess(res, result);
  } catch (err) {
    next(err);
  }
});

// --- GET /status/:renderId ---
router.get("/status/:renderId", async (req, res, next) => {
  try {
    const { renderId } = req.params;

    const progress = await getRenderStatus(renderId);

    sendSuccess(res, {
      renderId,
      status: progress.status,
      result: progress.result ?? null,
      ...(progress.status === "done" && { cost: progress.cost }),
      ...(progress.status === "failed" && { error: progress.error }),
      ...(progress.status === "processing" && {
        progress: progress.progress,
      }),
    });
  } catch (err) {
    next(err);
  }
});

export default router;
