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

export const TITLE_ANIMATION_DURATION = 125;

const EASE = Easing.bezier(0.333, 0, 0.667, 1);

const CLAMP = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();
  const { text1, text2 } = splitTitle(text);

  if (!text1) {
    return null;
  }

  const animationFrame = Math.max(
    0,
    Math.min(frame, TITLE_ANIMATION_DURATION - frame),
  );

  const text1Characters = Array.from(text1);
  const text2Characters = Array.from(text2);

  const text1Reveal = interpolate(
    animationFrame,
    [2, 19],
    [0, text1Characters.length],
    {
      ...CLAMP,
      easing: EASE,
    },
  );

  const text2Reveal = interpolate(
    animationFrame,
    [7, 24],
    [0, text2Characters.length],
    {
      ...CLAMP,
      easing: EASE,
    },
  );

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: -72, //negatif kalmak zorunda yoksa kotu seyler olur :P
          top: 716,
          width: 1080,
          height: 1350,
          transform: "scale(1.14)",
          transformOrigin: "top left",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 540,
            top: text2 ? 120 : 165,
            width: "max-content",
            padding: "10px 45px",
            color: "transparent",
            fontFamily,
            fontSize: 80,
            lineHeight: "100px",
            whiteSpace: "pre",
            transform: "translateX(-50%)",
          }}
        >
          {text1}

          {[2.475, 1.65, 0.825, 0].map((offset, index) => (
            <div
              key={offset}
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#2337D3",
                opacity: [1, 0.4439, 0.1632, 0.06][index],
                transform: `scaleX(${interpolate(
                  Math.max(0, animationFrame - offset),
                  [0, 13],
                  [0, 1],
                  {
                    ...CLAMP,
                    easing: EASE,
                  },
                )}) scaleY(0.72)`,
                transformOrigin: "calc(50% + 315.025px) center",
              }}
            />
          ))}

          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: interpolateColors(
                interpolate(animationFrame, [3, 14], [0, 1], {
                  ...CLAMP,
                  easing: EASE,
                }),
                [0, 1],
                ["#171717", "#FFFFFF"],
              ),
            }}
          >
            {text1Characters.map((character, index) => (
              <span
                key={index}
                style={{
                  opacity: text1Reveal >= index + 1 ? 1 : 0,
                }}
              >
                {character}
              </span>
            ))}
          </div>
        </div>

        {text2 && (
          <div
            style={{
              position: "absolute",
              left: 539,
              top: 215,
              width: "max-content",
              padding: "10px 45px",
              color: "transparent",
              fontFamily,
              fontSize: 80,
              lineHeight: "100px",
              whiteSpace: "pre",
              transform: "translateX(-50%)",
            }}
          >
            {text2}

            {[2.475, 1.65, 0.825, 0].map((offset, index) => (
              <div
                key={offset}
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "#233095",
                  opacity: [1, 0.4439, 0.1632, 0.06][index],
                  transform: `scaleX(${interpolate(
                    Math.max(0, animationFrame - offset),
                    [4, 22],
                    [0, 1],
                    {
                      ...CLAMP,
                      easing: Easing.bezier(0.333, 0, 0.803, 1),
                    },
                  )}) scaleY(${interpolate(
                    Math.max(0, animationFrame - offset),
                    [4, 22],
                    [0.72, 0.82275],
                    {
                      ...CLAMP,
                      easing: Easing.bezier(0.333, 0, 0.803, 1),
                    },
                  )})`,
                  transformOrigin: "calc(50% + 315.025px) center",
                }}
              />
            ))}

            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: interpolateColors(
                  interpolate(animationFrame, [10, 19], [0, 1], CLAMP),
                  [0, 1],
                  ["#2337D3", "#FFFFFF"],
                ),
              }}
            >
              {text2Characters.map((character, index) => (
                <span
                  key={index}
                  style={{
                    opacity: text2Reveal >= index + 1 ? 1 : 0,
                  }}
                >
                  {character}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
}