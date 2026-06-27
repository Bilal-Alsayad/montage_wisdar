import {
  renderMediaOnLambda,
  getRenderProgress,
  type RenderProgress,
} from "@remotion/lambda/client";
import { env } from "../config/env";
import type { RenderStatusResult, RenderRequest } from "../types/render.types";

// --- Trigger a render on Lambda ---
export async function triggerRender(params: RenderRequest) {
  const { video_id, template, videoSrc, data, width, height } = params;

  // Build webhook config
  const webhookConfig = env.webhookUrl
    ? {
        url: env.webhookUrl,
        secret: null,
        customData: { video_id },
      }
    : undefined;

  // Convert speaker start times to seconds
  if (Array.isArray(data.speakers) && data.speakers.length > 0) {
    data.speakers.forEach((speaker: any) => {
      if (speaker.start !== undefined && speaker.start !== null) {
        if (speaker.start < 10) {
          speaker.start = 10;
        }
        speaker.start = speaker.start * 60;
      }
    });
  }

  // Trigger render on Lambda
  const result = await renderMediaOnLambda({
    region: env.remotion.region,
    functionName: env.remotion.functionName,
    serveUrl: env.remotion.serveUrl,
    composition: template,
    inputProps: {
      videoSrc,
      data,
    },
    codec: "h264",
    imageFormat: "jpeg",
    maxRetries: 1,
    forceHeight: height,
    forceWidth: width,
    chromiumOptions: {
      disableWebSecurity: true,
    },
    webhook: webhookConfig,
  });

  return {
    renderId: result.renderId,
  };
}

// --- Check render progress ---
export async function getRenderStatus(
  renderId: string,
): Promise<RenderStatusResult> {
  const progress: RenderProgress = await getRenderProgress({
    renderId,
    bucketName: env.remotion.bucketName,
    region: env.remotion.region,
    functionName: env.remotion.functionName,
  });

  if (progress.done) {
    return {
      status: "done",
      result: progress.outputFile ?? null,
      cost: progress.costs.displayCost,
    };
  }

  if (progress.fatalErrorEncountered) {
    return {
      status: "failed",
      result: null,
      error: progress.errors?.[0]?.message || "Unknown render error",
    };
  }

  return {
    status: "processing",
    result: null,
    progress: Math.round((progress.overallProgress ?? 0) * 100),
  };
}
