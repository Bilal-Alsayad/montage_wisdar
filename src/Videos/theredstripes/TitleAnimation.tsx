import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { splitTextIntoMultipleLines } from "../../utils/textUtils";

interface TitleAnimationProps {
  text: string;
  fontFamily: string;
}

export const TITLE_ANIMATION_DURATION = 128;

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();
  const lines = splitTextIntoMultipleLines(text, 4, 25).filter((line) =>
    line.trim(),
  );

  if (!lines.length) {
    return null;
  }

  const boxOpacity = interpolate(frame, [0, 9], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.333, 0, 0.667, 1),
  });

  const boxTranslateX = interpolate(frame, [-4, 8], [-76, 0], {
    ...clamp,
    easing: Easing.bezier(0.333, 0, 0.667, 1),
  });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 1364,
          transform: `translate(${boxTranslateX}px, -50%)`,
          opacity: boxOpacity,
        }}
      >
        <div
          dir="rtl"
          style={{
            transform: "translateX(-50%)",
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "fit-content",
            maxWidth: 949,
            padding: "22px 26px",
            backgroundColor: "#fff",
            boxSizing: "border-box",
          }}
        >
          {lines.map((line, index) => {
            const progress = interpolate(
              frame,
              [
                -11 + index * (23 / lines.length),
                12 + index * (23 / lines.length),
              ],
              [0, 1],
              {
                ...clamp,
                easing: Easing.bezier(0.333, 0, 0.667, 1),
              },
            );

            return (
              <div
                key={index}
                style={{
                  color: "#000",
                  fontFamily,
                  fontSize: 60,
                  lineHeight: "72px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  opacity: progress,
                  transform: `translateY(${80 * (1 - progress)}px)`,
                }}
              >
                {line}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}