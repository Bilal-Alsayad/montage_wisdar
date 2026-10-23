import type { CSSProperties } from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { splitTitle } from "../../utils/textUtils";

export interface TitleAnimationStyles {
  container: CSSProperties;
  firstLine: CSSProperties;
  secondLine: CSSProperties;
}

interface TitleAnimationProps {
  text: string;
  styles: TitleAnimationStyles;
}

export const TITLE_ANIMATION_DURATION = 151;

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const EASE = Easing.bezier(0.333, 0, 0.667, 1);

export default function TitleAnimation({ text, styles }: TitleAnimationProps) {
  const frame = useCurrentFrame();
  const { text1, text2 } = splitTitle(text);

  if (!text1) {
    return null;
  }

  const exitReveal = interpolate(frame, [130, 150], [1, 0], {
    ...CLAMP,
    easing: EASE,
  });
  const firstProgress = Math.min(
    interpolate(frame, [0, 24], [0, 1], { ...CLAMP, easing: EASE }),
    exitReveal,
  );
  const secondProgress = Math.min(
    interpolate(frame, [8, 32], [0, 1], { ...CLAMP, easing: EASE }),
    exitReveal,
  );

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
        <svg
          viewBox="0 0 900 220"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          <path
            d="M 760 25 A 90 90 0 1 1 760 195"
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeLinecap="round"
            strokeWidth="8"
          />
        </svg>
        <div
          style={{
            ...styles.firstLine,
            position: "relative",
            clipPath: `inset(0 0 0 ${(1 - firstProgress) * 100}%)`,
            transform: `translateX(${(1 - firstProgress) * 45}px)`,
          }}
        >
          {text1}
        </div>
        {text2 && (
          <div
            style={{
              ...styles.secondLine,
              position: "relative",
              clipPath: `inset(0 0 0 ${(1 - secondProgress) * 100}%)`,
              transform: `translateX(${(1 - secondProgress) * 45}px)`,
            }}
          >
            {text2}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
}
