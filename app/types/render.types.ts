// --- Render request body ---
export interface RenderRequest {
  video_id: number;
  template: string;
  videoSrc: string;
  data: Record<string, unknown>;
  width?: number;
  height?: number;
}

// --- Render status result---
export type RenderStatusResult =
  | { status: "done"; result: string | null; cost: unknown }
  | { status: "failed"; result: null; error: string }
  | { status: "processing"; result: null; progress: number };

