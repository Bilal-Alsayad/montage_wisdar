import {
  AbsoluteFill,
  Easing,
  interpolate,
  interpolateColors,
  useCurrentFrame,
} from "remotion";
import { splitTitle } from "../../utils/textUtils";

interface TitleAnimationProps {
  text: string;
  fontFamily: string;
}

export const TITLE_ANIMATION_DURATION = 178;

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();
  const title = splitTitle(text);

  if (!title.text1) {
    return null;
  }

  return (
    <AbsoluteFill>
      {[title.text1, title.text2]
        .filter(Boolean)
        .map((line, index) => {
          const start = index * 8;
          const exit = 155 + index * 5;

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: 110,
                top: title.text2 ? 1000 + index * 120 : 1120,
                transform: `translateX(${
                  interpolate(
                    frame,
                    [start, start + 24],
                    [-343, 0],
                    {
                      ...CLAMP,
                      easing: Easing.bezier(
                        0.167,
                        0.167,
                        0.4,
                        1,
                      ),
                    },
                  ) +
                  interpolate(
                    frame,
                    [exit, exit + 10],
                    [0, 40],
                    {
                      ...CLAMP,
                      easing: Easing.bezier(
                        0.33,
                        0,
                        0.833,
                        0.833,
                      ),
                    },
                  )
                }px)`,
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
                    left: interpolate(
                      frame,
                      [0, 174],
                      [-33, 185],
                      CLAMP,
                    ),
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
                    [
                      index === 0 ? "#b80c09" : "#940A07",
                      "#ffffff",
                    ],
                  ),
                  clipPath: `inset(0 ${interpolate(
                    frame,
                    [start, start + 22],
                    [100, 0],
                    {
                      ...CLAMP,
                      easing: Easing.bezier(
                        0.167,
                        0.167,
                        0.4,
                        1,
                      ),
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
                    opacity:
                      frame >=
                      start + (index === 0 ? 1 : 3)
                        ? 1
                        : 0,
                  }}
                >
                  {line}
                </span>
              </div>
            </div>
          );
        })}
    </AbsoluteFill>
  );
}