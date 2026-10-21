import { CalculateMetadataFunction } from "remotion";
import { parseMedia } from "@remotion/media-parser";
import { z } from "zod";
import { VideoTemplateSchema } from "./schemas";
import { VIDEO_FPS, f } from "./constants";

type VideoTemplateProps = z.infer<typeof VideoTemplateSchema>;

const DEFAULT_OUTRO_OVERLAP_FRAMES = f(75);

export const createCalculateVideoMetadata = (
  outroPath?: string,
  width: number = 1080,
  height: number = 1920,
): CalculateMetadataFunction<VideoTemplateProps> => {
  const outroSrc = outroPath;

  return async ({ props }) => {
    const fps = VIDEO_FPS;

    // Calculate total main video duration from all sequences.
    const mainVideoDurationInSeconds = props.data.sequences.reduce(
      (total, seq) => total + (seq.end - seq.start),
      0,
    );

    const mainVideoDurationInFrames = Math.floor(
      mainVideoDurationInSeconds * fps,
    );

    let outroDurationInFrames = 0;
    if (outroSrc) {
      try {
        const outroResult = await Promise.race([
          parseMedia({
            src: outroSrc,
            fields: {
              slowDurationInSeconds: true,
            },
          }),
          new Promise<never>((_, reject) =>
            setTimeout(
              () => reject(new Error("parseMedia outro timed out after 15s")),
              15_000,
            ),
          ),
        ]);
        outroDurationInFrames = Math.floor(
          outroResult.slowDurationInSeconds * fps,
        );
      } catch (e) {
        console.warn("Could not parse outro video, using default duration:", e);
        outroDurationInFrames = f(150);
      }
    }

    const overlapFrames = outroSrc
      ? (props.outroOverlapFrames ?? DEFAULT_OUTRO_OVERLAP_FRAMES)
      : 0;

    const outroStartFrame = outroSrc
      ? mainVideoDurationInFrames - overlapFrames
      : mainVideoDurationInFrames;
    const totalDurationInFrames = outroSrc
      ? outroStartFrame + outroDurationInFrames
      : mainVideoDurationInFrames;

    return {
      fps,
      durationInFrames: totalDurationInFrames,
      width,
      height,
      props: {
        ...props,
        mainVideoDurationInFrames,
        outroDurationInFrames,
        outroStartFrame,
        outroOverlapFrames: overlapFrames,
      },
    };
  };
};

