import React from "react";
import { Img, useCurrentFrame, useVideoConfig } from "remotion";

export interface ImageSequenceProps {
  /**
   * The directory path inside public where the frames are stored.
   * Example: "arenaArabia/element/logo"
   */
  folderPath: string;
  /**
   * The base name of the files before the number.
   * Example: "frame_"
   */
  filePrefix?: string;
  /**
   * The extension of the files.
   * Example: "png"
   */
  extension?: string;
  /**
   * The number of digits used for padding the frame number.
   * Example: 4 (for frame_0001.png)
   */
  padStart?: number;
  /**
   * The number of frames used for the intro/outro animation.
   * Example: 60
   */
  activeFrames: number;
  /**
   * The total number of frames in the sequence directory.
   * Example: 602
   */
  totalSequenceFrames: number;
  /**
   * The frame number to hold (freeze) on during the middle of the video.
   * If not provided, it defaults to the last frame of the intro animation (`activeFrames`).
   */
  holdFrame?: number;
  /**
   * The number of frames to wait before starting the outro animation.
   */
  exitStart?: number;
  /**
   * Optional custom styles for the container.
   */
  style?: React.CSSProperties;
}

export const ImageSequence: React.FC<ImageSequenceProps> = ({
  folderPath,
  filePrefix = "frame_",
  extension = "png",
  padStart = 4,
  activeFrames,
  totalSequenceFrames,
  holdFrame,
  exitStart = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // The frame index (1-based) to request from the sequence directory
  let imageIndex = 1;

  const freezeFrame = holdFrame ?? activeFrames;
  const exitStartFrame = durationInFrames - activeFrames - exitStart;

  if (frame < activeFrames) {
    // 1. Intro Animation
    imageIndex = frame + 1;
  } else if (frame >= exitStartFrame) {
    // 3. Outro Animation
    const framesIntoOutro = frame - exitStartFrame;
    const outroStartIndex = totalSequenceFrames - activeFrames + 1;
    imageIndex = outroStartIndex + framesIntoOutro;
  } else {
    // 2. Hold/Freeze in the middle
    imageIndex = freezeFrame;
  }

  // Ensure we don't request a frame outside the bounds
  const clampedIndex = Math.max(1, Math.min(imageIndex, totalSequenceFrames));

  // Format the number, e.g., 1 -> "0001"
  const paddedNumber = String(clampedIndex).padStart(padStart, "0");
  const fileName = `${filePrefix}${paddedNumber}.${extension}`;

  return (
    <Img
      src={`${folderPath}/${fileName}`}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        ...style,
      }}
    />
  );
};
