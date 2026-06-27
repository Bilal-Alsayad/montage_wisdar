import { Router } from "express";
import { triggerRenderCover } from "../services/cover.service";
import { ValidationError } from "../errors";
import { sendSuccess } from "../utils/response";

const router = Router();

// --- POST /cover ---
router.post("/cover", async (req, res, next) => {
  try {
    const { template, data } = req.body;

    // Validation
    if (!template || typeof template !== "string") {
      throw new ValidationError("template is required and must be a string");
    }
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      throw new ValidationError("data is required and must be an object");
    }

    const result = await triggerRenderCover({ template, data });

    sendSuccess(res, result);
  } catch (err) {
    next(err);
  }
});

export default router;