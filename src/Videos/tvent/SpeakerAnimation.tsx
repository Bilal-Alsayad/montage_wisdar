import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";

interface SpeakerAnimationProps {
  name?: string;
  description?: string;
  fontFamily: string;
}

export const SPEAKER_ANIMATION_DURATION = 144;

const BOX_PADDING_X = 24;

export default function SpeakerAnimation({
  name,
  description,
  fontFamily,
}: SpeakerAnimationProps) {
  const frame = useCurrentFrame();

  if (!name && !description) {
    return null;
  }

  const textProgress = interpolate(
    frame,
    [0, 17, 127, SPEAKER_ANIMATION_DURATION],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.333, 0, 0.667, 1),
    },
  );

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 220,
          top: 1225,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap:3,
        }}
      >
        {name && (
          <div
            style={{
              height: 70,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: BOX_PADDING_X,
              paddingRight: BOX_PADDING_X,
              backgroundColor: "#ffffff",
              borderRadius: 11,
              opacity: interpolate(
                frame,
                [0, 11, 133, SPEAKER_ANIMATION_DURATION],
                [0.02, 1, 1, 0.02],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.333, 0, 0.667, 1),
                },
              ),
              overflow: "hidden",
            }}
          >
            <span
              style={{
                color: "#000000",
                fontFamily,
                fontSize: 32,
                lineHeight: 1,
                whiteSpace: "nowrap",
                opacity: textProgress,
                transform: `translateX(${21.44 * (1 - textProgress)}px)`,
                clipPath: `inset(0 ${
                  (1 - textProgress) * 100
                }% 0 0)`,
              }}
            >
              {name}
            </span>
          </div>
        )}

        {description && (
          <div
            style={{
              height: 70,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: BOX_PADDING_X,
              paddingRight: BOX_PADDING_X,
              backgroundColor: "#06081e",
              borderRadius: 10.72,
              opacity: interpolate(
                frame,
                [0, 11, 133, SPEAKER_ANIMATION_DURATION],
                [0.02, 1, 1, 0.02],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.333, 0, 0.667, 1),
                },
              ),
              overflow: "hidden",
            }}
          >
            <span
              style={{
                color: "#ffffff",
                fontFamily,
                fontSize: 32,
                lineHeight: 1,
                whiteSpace: "nowrap",
                opacity: textProgress,
                transform: `translateX(${21.44 * (1 - textProgress)}px)`,
                clipPath: `inset(0 ${
                  (1 - textProgress) * 100
                }% 0 0)`,
              }}
            >
              {description}
            </span>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
}
