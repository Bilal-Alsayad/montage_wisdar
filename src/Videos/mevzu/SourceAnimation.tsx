import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";

interface SourceAnimationProps {
  text?: string;
  fontFamily: string;
}

export const SOURCE_ANIMATION_DURATION = 200;

export default function SourceAnimation({
  text,
  fontFamily,
}: SourceAnimationProps) {
  const frame = useCurrentFrame();

  if (!text?.trim()) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 484,
        right: 180,
        opacity: interpolate(frame, [190, 200], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        whiteSpace: "nowrap",
      }}
    >
      <Img
        src={staticFile("mevzu/images/source.png")}
        style={{
          width: 24,
          height: "auto",
        }}
      />

      <span
        style={{
          color: "#FFFFFF",
          fontFamily,
          fontSize: 27.8871307373047,
          lineHeight: "33.4645500183105px",
        }}
      >
        {text}
      </span>
    </div>
  );
}
