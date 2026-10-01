import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { splitTextIntoMultipleLines } from "../../utils/textUtils";

interface TitleAnimationProps {
  text: string;
  fontFamily: string;
}

export const TITLE_ANIMATION_DURATION = 102;

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sourceFrame = frame * (25 / fps);
  const lines = splitTextIntoMultipleLines(text, 3);

  const fade = (start: number) =>
    interpolate(sourceFrame, [start, start + 8], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.167, 0.167, 0.833, 0.833),
    });

  const move = (start: number) =>
    interpolate(sourceFrame, [start, start + 18], [82, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.167, 0, 0.355, 0.992),
    });

  const renderLine = (
    line: string,
    index: number,
    top: number,
    backgroundColor: string,
  ) => {
    if (!line?.trim()) return null;

    return (
      <div
        key={index}
        style={{
          position: "absolute",
          left: 540,
          top,
          height: 70,
          padding: "0 15px",
          display: "inline-flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          transform: `translate(-50%, ${move(index * 2)}px)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor,
            opacity: fade(index * 2),
          }}
        />

        <span
          style={{
            position: "relative",
            fontFamily,
            fontSize: 48.6,
            lineHeight: "65.418px",
            color: "#000000",
            opacity: fade(index * 2),
          }}
        >
          {line}
        </span>
      </div>
    );
  };

  return (
    <div
      style={{
        opacity: interpolate(frame, [92, 102], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      {renderLine(lines[0], 0, 900, "#FFF704")}
      {renderLine(lines[1], 1, 975, "#C9C9C9")}
      {renderLine(lines[2], 2, 1055, "#FFF704")}
    </div>
  );
}
