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

  if (!text1) return null;

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
  const opacity = interpolate(frame, [0, 12, 130, 150], [0, 1, 1, 0], {
    ...CLAMP,
    easing: EASE,
  });

  return (
    <AbsoluteFill>
      <div style={{ ...styles.container, opacity }}>
        <svg
          viewBox="69 61 569 202"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <path
            d="M111 63 H88 V85 M597 63 H619 V85 M88 238 V261 H111 M619 238 V261 H597"
            fill="none"
            stroke="#FFFFFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.4"
          />
          <polygon points="69,154 81,162 69,170" fill="#E51B23" />
          <polygon points="638,154 626,162 638,170" fill="#E51B23" />
        </svg>
        <div
          style={{
            ...styles.firstLine,
            zIndex: 1,
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
              zIndex: 1,
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
