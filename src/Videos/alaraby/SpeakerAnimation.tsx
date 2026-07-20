import {
  AbsoluteFill,
  Easing,
  interpolate,
  interpolateColors,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface SpeakerAnimationProps {
  name: string;
  description: string;
  fontFamily: string;
}

export const SPEAKER_ANIMATION_DURATION = 118;

export default function SpeakerAnimation({
  name,
  description,
  fontFamily,
}: SpeakerAnimationProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sourceFrame = (frame * 25) / fps;

  const animationFrame = Math.max(
    0,
    sourceFrame < 78 ? sourceFrame : 98 - sourceFrame,
  );

  const animate = (
    inputRange: [number, number],
    outputRange: [number, number],
    easing = Easing.bezier(0.333, 0, 0.667, 1),
  ) =>
    interpolate(animationFrame, inputRange, outputRange, {
      easing,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  return (
    <AbsoluteFill>
      <div
        dir="rtl"
        style={{
          position: "absolute",
          top: 1038,
          right: 115,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            height: 57,
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "nowrap",
            backgroundColor: interpolateColors(
              animate([5, 14], [0, 1]),
              [0, 1],
              ["#ffffff", "#cc2e2e"],
            ),
            opacity: animate([5, 10], [0, 1]),
            transform: `translateY(${animate(
              [5, 18],
              [58, 0],
              Easing.bezier(0.333, 0, 0.322, 1),
            )}px)`,
            color: "white",
            fontFamily,
            fontSize: 50,
            lineHeight: "60px",
          }}
        >
          <span
            style={{
              clipPath: `inset(0 0 0 ${
                100 -
                animate(
                  [7, 22],
                  [0, 100],
                  Easing.bezier(0.333, 0, 0.194, 1),
                )
              }%)`,
            }}
          >
            {name}
          </span>
        </div>

        <div
          style={{
            height: 57,
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "nowrap",
            backgroundColor: interpolateColors(
              animate([10, 16], [0, 1]),
              [0, 1],
              ["#cc2e2e", "#ffffff"],
            ),
            opacity: animate([7, 12], [0, 1]),
            transform: `translateY(${animate(
              [7, 21],
              [58, 0],
              Easing.bezier(0.333, 0, 0.347, 1),
            )}px)`,
            color: "#171717",
            fontFamily,
            fontSize: 35,
            lineHeight: "42px",
          }}
        >
          <span
            style={{
              clipPath: `inset(0 0 0 ${
                100 -
                animate(
                  [9, 24],
                  [0, 100],
                  Easing.bezier(0.333, 0, 0.194, 1),
                )
              }%)`,
            }}
          >
            {description}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
}