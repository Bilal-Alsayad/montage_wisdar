import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { splitTextIntoMultipleLines } from "../../utils/textUtils";

interface TitleAnimationProps {
  text: string;
  fontFamily: string;
}

interface GreenLineProps {
  text: string;
  frame: number;
  lineIndex: number;
}

export const TITLE_ANIMATION_DURATION = 144;

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const EASING = Easing.bezier(0.333, 0, 0.667, 1);

function GreenLine({ text, frame, lineIndex }: GreenLineProps) {
  if (!text.trim() || lineIndex === 0) {
    return null;
  }

  const greenLineIndex = lineIndex - 1;
  const lineWidth = 34.9 * text.length;

  return (
    <div
      style={{
        position: "absolute",
        left: interpolate(
          frame,
          [5 + greenLineIndex * 12, 19 + greenLineIndex * 12],
          [48.311 - greenLineIndex * 4, 95.311],
          {
            ...CLAMP,
            easing: EASING,
          },
        ),
        top: 1206 + lineIndex * 85,
        width:
          lineWidth *
          interpolate(
            frame,
            [9 + greenLineIndex * 10, 43 + greenLineIndex * 10],
            [0, 1],
            {
              ...CLAMP,
              easing: EASING,
            },
          ),
        height: 14.4,
        overflow: "hidden",
        opacity: interpolate(
          frame,
          [9 + greenLineIndex * 11, 18 + greenLineIndex * 12],
          [0, 1],
          {
            ...CLAMP,
            easing: EASING,
          },
        ),
      }}
    >
      <Img
        src={staticFile("tvnet/images/line.png")}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: lineWidth,
          height: 14.4,
        }}
      />
    </div>
  );
}

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();

  const animationFrame =
    frame < 72 ? frame : TITLE_ANIMATION_DURATION - frame;

  const lines = splitTextIntoMultipleLines(text, 3).filter((line) =>
    line.trim(),
  );

  return (
    <AbsoluteFill>
      {lines.map((line, lineIndex) => (
        <div
          key={`${line}-${lineIndex}`}
          style={{
            position: "absolute",
            left: 95,
            top: 1130 + lineIndex * 85,
            width: 880,
            height: 75,
            color: "white",
            fontFamily,
            fontSize: 65,
            fontWeight: 700,
            lineHeight: "80px",
            letterSpacing: "-0.195px",
            textAlign: "left",
            whiteSpace: "nowrap",
            opacity: interpolate(
              animationFrame,
              [
                lineIndex === 0 ? 1 : lineIndex * 9,
                9 + lineIndex * 9,
              ],
              [0, 1],
              {
                ...CLAMP,
                easing: EASING,
              },
            ),
            transform: `translateY(${interpolate(
              animationFrame,
              [
                lineIndex === 0 ? 1 : lineIndex * 9,
                9 + lineIndex * 9,
              ],
              [15, 0],
              {
                ...CLAMP,
                easing: EASING,
              },
            )}px)`,
          }}
        >
          {line}
        </div>
      ))}

      {lines.slice(1).map((line, index) => (
        <GreenLine
          key={`green-line-${index + 1}`}
          text={line}
          frame={animationFrame}
          lineIndex={index + 1}
        />
      ))}
    </AbsoluteFill>
  );
}