import type { CSSProperties } from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

export interface TitleAnimationStyles {
  container: CSSProperties;
}

interface TitleAnimationProps {
  text: string;
  styles: TitleAnimationStyles;
}

export const TITLE_ANIMATION_DURATION = 151;

export default function TitleAnimation({ text, styles }: TitleAnimationProps) {
  const frame = useCurrentFrame();

  if (!text) {
    return null;
  }

  const opacity = interpolate(frame, [0, 21, 130, 150], [0, 1, 1, 0], {
    easing: Easing.bezier(0.333, 0, 0.667, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <div
        style={{
          ...styles.container,
          opacity,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
}
