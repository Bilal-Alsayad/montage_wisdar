import { CalculateMetadataFunction } from "remotion";
import { parseMedia } from "@remotion/media-parser";
import { z } from "zod";
import { VideoTemplateSchema } from "./schemas";

type VideoTemplateProps = z.infer<typeof VideoTemplateSchema>;

const DEFAULT_OUTRO_OVERLAP_FRAMES = 75;

export const createCalculateVideoMetadata = (
  outroPath?: string,
  width: number = 1080,
  height: number = 1920,
): CalculateMetadataFunction<VideoTemplateProps> => {
  const outroSrc = outroPath;

  return async ({ props }) => {
    const fps = 30;

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
        const outroResult = await parseMedia({
          src: outroSrc,
          fields: {
            slowDurationInSeconds: true,
          },
        });
        outroDurationInFrames = Math.floor(
          outroResult.slowDurationInSeconds * fps,
        );
      } catch (e) {
        console.warn("Could not parse outro video, using default duration");
        outroDurationInFrames = 150;
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

