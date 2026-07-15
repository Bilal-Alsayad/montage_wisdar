import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";

interface SourceAnimationProps {
  text?: string;
  fontFamily: string;
}

export const SOURCE_ANIMATION_DURATION = 144;

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export default function SourceAnimation({
  text,
  fontFamily,
}: SourceAnimationProps) {
  const frame = useCurrentFrame();

  if (!text) {
    return null;
  }

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 185,
          display: "inline-flex",
          padding:"5px",
          backgroundColor: "#000000",
          opacity: interpolate(frame, [0, 3], [0, 1], CLAMP),
        }}
      >
        <div
          style={{
            color: "#FFFFFF",
            fontFamily,
            fontSize: 33,
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </div>
      </div>
    </AbsoluteFill>
  );
}