import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { splitTitle } from "../../utils/textUtils";

const EASE = Easing.bezier(0.333, 0, 0.667, 1);

interface TitleAnimationProps {
  fontFamily: string;
  text: string;
}

export const TITLE_ANIMATION_DURATION = 125;

export default function TitleAnimation({
  fontFamily,
  text,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();
  const { text1, text2 } = splitTitle(text);

  const LINE1_START = 15;
  const LINE2_START = 20;
  const DURATION = 25;
  const FADE_OUT_START = 120;
  const FADE_OUT_DURATION = 5;

  // Line 1 animations
  const line1Y = interpolate(
    frame,
    [LINE1_START, LINE1_START + DURATION],
    [100, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
  );
  const line1ScaleX = interpolate(
    frame,
    [LINE1_START, LINE1_START + DURATION],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
  );
  const line1Clip = interpolate(
    frame,
    [LINE1_START, LINE1_START + DURATION],
    [50, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
  );

  // Line 2 animations
  const line2Y = interpolate(
    frame,
    [LINE2_START, LINE2_START + DURATION],
    [100, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
  );
  const line2ScaleX = interpolate(
    frame,
    [LINE2_START, LINE2_START + DURATION],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
  );
  const line2Clip = interpolate(
    frame,
    [LINE2_START, LINE2_START + DURATION],
    [50, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
  );

  // FadeOut
  const fadeOut = interpolate(
    frame,
    [FADE_OUT_START, FADE_OUT_START + FADE_OUT_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const boxStyle: React.CSSProperties = {
    fontFamily,
    fontSize: 70,
    height: 100,
    borderRadius: 30,
    outline: "0.5px solid #FFFFFF",
    width: "fit-content",
    padding: "5px 20px",
    display: "flex",
    alignItems: "flex-end",
    overflow: "hidden",
  };

  const textOffsetY = -7;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 1280,
          textAlign: "center",
          direction: "rtl",
          whiteSpace: "nowrap",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          opacity: fadeOut,
        }}
      >
        {/* Line 1 */}
        <div
          style={{ position: "relative", transform: `translateY(${line1Y}px)` }}
        >
          {/* Box background */}
          <div
            style={{
              ...boxStyle,
              color: "transparent",
              transform: `scaleX(${line1ScaleX})`,
              background:
                "linear-gradient(to right, #111E31 0%, #04295E 99.8%)",
            }}
          >
            <span
              style={{
                transform: `translateY(${textOffsetY}px)`,
                display: "inline-block",
              }}
            >
              {text1}
            </span>
          </div>
          {/* Text  */}
          <div
            style={{
              ...boxStyle,
              position: "absolute",
              inset: 0,
              color: "#11EDF9",
              background: "none",
              outline: "none",
              clipPath: `inset(0 ${line1Clip}% 0 ${line1Clip}%)`,
            }}
          >
            <span
              style={{
                transform: `translateY(${textOffsetY}px)`,
                display: "inline-block",
              }}
            >
              {text1}
            </span>
          </div>
        </div>

        {/* Line 2 */}
        <div
          style={{ position: "relative", transform: `translateY(${line2Y}px)` }}
        >
          {/* Box background */}
          <div
            style={{
              ...boxStyle,
              color: "transparent",
              transform: `scaleX(${line2ScaleX})`,
              background:
                "linear-gradient(to right, #52B5C3 0.1%, #027E90 100%)",
            }}
          >
            <span
              style={{
                transform: `translateY(${textOffsetY}px)`,
                display: "inline-block",
              }}
            >
              {text2}
            </span>
          </div>
          {/* Text */}
          <div
            style={{
              ...boxStyle,
              position: "absolute",
              inset: 0,
              color: "#FFFFFF",
              background: "none",
              outline: "none",
              clipPath: `inset(0 ${line2Clip}% 0 ${line2Clip}%)`,
            }}
          >
            <span
              style={{
                transform: `translateY(${textOffsetY}px)`,
                display: "inline-block",
              }}
            >
              {text2}
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}
