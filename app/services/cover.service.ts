import { renderStillOnLambda } from "@remotion/lambda/client";
import { env } from "../config/env";
import type { CoverRequest } from "../types/cover.types";

// --- Trigger a cover render on Lambda ---
export async function triggerRenderCover(params: CoverRequest) {
  const { template, data } = params;

  const result = await renderStillOnLambda({
    region: env.remotion.region,
    functionName: env.remotion.functionName,
    serveUrl: env.remotion.serveUrl,
    privacy: "public",
    composition: template,
    inputProps: {
      data,
    },
    imageFormat: "png",
    maxRetries: 1,
  });

  return result;
}
