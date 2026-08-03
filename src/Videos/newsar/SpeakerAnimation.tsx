import type { CSSProperties } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  interpolateColors,
  useCurrentFrame,
} from "remotion";

export interface SpeakerAnimationStyles {
  nameContainer: CSSProperties;
  nameText: CSSProperties;
  descriptionContainer: CSSProperties;
  descriptionText: CSSProperties;
  nameBackgroundColors: [string, string];
  descriptionBackgroundColors: [string, string];
}

interface SpeakerAnimationProps {
  name: string;
  description: string;
  styles: SpeakerAnimationStyles;
}

export const SPEAKER_ANIMATION_DURATION = 118;

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const ease = Easing.bezier(0.333, 0, 0.667, 1);

export default function SpeakerAnimation({
  name,
  description,
  styles,
}: SpeakerAnimationProps) {
  const frame = useCurrentFrame();

  const animationFrame = frame < 94 ? frame / 1.2 : 98 - frame / 1.2;

  if (!name && !description) {
    return null;
  }

  return (
    <AbsoluteFill>
      {name && (
        <div
          style={{
            ...styles.nameContainer,

            backgroundColor: interpolateColors(
              interpolate(animationFrame, [5, 14], [0, 1], {
                ...clamp,
                easing: ease,
              }),
              [0, 1],
              styles.nameBackgroundColors,
            ),

            opacity: interpolate(animationFrame, [5, 10], [0, 1], {
              ...clamp,
              easing: ease,
            }),

            transform: `translateY(${interpolate(
              animationFrame,
              [5, 18],
              [58, 0],
              {
                ...clamp,
                easing: Easing.bezier(0.333, 0, 0.322, 1),
              },
            )}px)`,
          }}
        >
          <span
            style={{
              ...styles.nameText,

              clipPath: `inset(0 0 0 ${interpolate(
                animationFrame,
                [7, 22],
                [100, 0],
                {
                  ...clamp,
                  easing: Easing.bezier(0.333, 0, 0.194, 1),
                },
              )}%)`,
            }}
          >
            {name}
          </span>
        </div>
      )}

      {description && (
        <div
          style={{
            ...styles.descriptionContainer,

            backgroundColor: interpolateColors(
              interpolate(animationFrame, [10, 16], [0, 1], {
                ...clamp,
                easing: ease,
              }),
              [0, 1],
              styles.descriptionBackgroundColors,
            ),

            opacity: interpolate(animationFrame, [7, 12], [0, 1], {
              ...clamp,
              easing: ease,
            }),

            transform: `translateY(${interpolate(
              animationFrame,
              [7, 21],
              [58, 0],
              {
                ...clamp,
                easing: Easing.bezier(0.333, 0, 0.347, 1),
              },
            )}px)`,
          }}
        >
          <span
            style={{
              ...styles.descriptionText,

              clipPath: `inset(0 0 0 ${interpolate(
                animationFrame,
                [9, 24],
                [100, 0],
                {
                  ...clamp,
                  easing: Easing.bezier(0.333, 0, 0.194, 1),
                },
              )}%)`,
            }}
          >
            {description}
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
}
