import {
  AbsoluteFill,
  Easing,
  interpolate,
  interpolateColors,
  useCurrentFrame,
} from "remotion";
import { splitTextIntoMultipleLines } from "../../utils/textUtils";

interface TitleAnimationProps {
  text: string;
  fontFamily: string;
}

export const TITLE_ANIMATION_DURATION = 178;

const LINE_COLORS = ["#B80C09", "#940A07", "#6B0705", "#420403"];

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();
  const lines = splitTextIntoMultipleLines(text, 4);

  if (!lines[0]) {
    return null;
  }

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 110,
          bottom: 680,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {lines.map((line, index) => {
          const start = index * 8;
          const exit = 155 + index * 4;

          const translateX =
            interpolate(frame, [start, start + 24], [-343, 0], {
              ...CLAMP,
              easing: Easing.bezier(0.167, 0.167, 0.4, 1),
            }) +
            interpolate(frame, [exit, exit + 10], [0, 40], {
              ...CLAMP,
              easing: Easing.bezier(0.33, 0, 0.833, 0.833),
            });

          return (
            <div
              key={`${line}-${index}`}
              style={{
                position: "relative",
                height: 120,
                transform: `translateX(${translateX}px)`,
                opacity: interpolate(
                  frame,
                  [exit + 5, exit + 10],
                  [1, 0],
                  CLAMP,
                ),
              }}
            >
              {index === 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: -8,
                    left: interpolate(frame, [0, 174], [-33, 185], CLAMP),
                    width: 37,
                    height: 15,
                    backgroundColor: "white",
                  }}
                />
              )}

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  height: 120,
                  paddingLeft: 20,
                  paddingRight: interpolate(
                    frame,
                    [exit, exit + 10],
                    [30, 10],
                    CLAMP,
                  ),
                  backgroundColor: interpolateColors(
                    frame,
                    [exit, exit + 10],
                    [LINE_COLORS[index], "#ffffff"],
                  ),
                  clipPath: `inset(0 ${interpolate(
                    frame,
                    [start, start + 22],
                    [100, 0],
                    {
                      ...CLAMP,
                      easing: Easing.bezier(0.167, 0.167, 0.4, 1),
                    },
                  )}% 0 0)`,
                  color: "white",
                  fontFamily,
                  fontSize: 60,
                  lineHeight: "72px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    opacity: frame >= start + (index === 0 ? 1 : 3) ? 1 : 0,
                  }}
                >
                  {line}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}
