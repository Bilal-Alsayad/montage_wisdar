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

export const TITLE_ANIMATION_DURATION = 92;

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      {splitTextIntoMultipleLines(text, 2)
        .filter((line) => line.trim())
        .map((line, index) => (
          <div
            key={index}
            dir="rtl"
            style={{
              position: "absolute",
              top: 1125 + index * 118,
              right: 95,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "max-content",
              height: 118,
              padding: "0 22px",
              backgroundColor: index === 0 ? "#ffffff" : "#ffdd36",
              color: "#16375c",
              fontFamily,
              fontSize: 75,
              fontWeight: 700,
              lineHeight: 1,
              whiteSpace: "nowrap",
              clipPath: `inset(0 0 0 ${interpolate(
                frame < 69 ? frame : 96 - frame,
                [4, 27],
                [100, 0],
                {
                  easing: Easing.bezier(0.219, 0, 0.843, 1),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              )}%)`,
            }}
          >
            <div
              style={{
                transform: `translateX(${interpolate(
                  frame < 69 ? frame : 96 - frame,
                  [6, 27],
                  [100, 0],
                  {
                    easing: Easing.bezier(0.095, 0, 0.194, 1),
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  },
                )}%)`,
              }}
            >
              {line}
            </div>
          </div>
        ))}
    </AbsoluteFill>
  );
}