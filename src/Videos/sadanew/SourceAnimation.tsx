import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

const EASE_SOURCE = Easing.bezier(0.333, 0, 0.109, 1);
const EASE_LINEAR = Easing.bezier(0.167, 0.167, 0.833, 0.833);

interface SourceAnimationProps {
  fontFamily: string;
  source?: string;
}

export default function SourceAnimation({
  fontFamily,
  source,
}: SourceAnimationProps) {
  const frame = useCurrentFrame();

  if (!source) return null;

  // Source icon animation (0 to 26 frames relative to Sequence from={94})
  const sourceIconY = interpolate(frame, [0, 26], [30, 5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_SOURCE,
  });
  const sourceIconOpacity = frame >= 0 ? 1 : 0;

  // Source text animation (10 to 27 frames relative to Sequence from={94})
  const sourceTextY = interpolate(frame, [10, 27], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_SOURCE,
  });
  const sourceTextOpacity = interpolate(frame, [10, 27], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_LINEAR,
  });

  return (
    <AbsoluteFill>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          top: 183,
          left: 170,
          gap: 10,
        }}
      >
        <Img
          src={staticFile("sadanew/icons/source.png")}
          style={{
            opacity: sourceIconOpacity,
            transform: `translateY(${sourceIconY}px)`,
          }}
        />
        <div
          style={{
            fontFamily,
            fontSize: 30,
            color: "#FFFFFF",
            opacity: sourceTextOpacity,
            transform: `translateY(${sourceTextY}px)`,
          }}
        >
          {source}
        </div>
      </div>
    </AbsoluteFill>
  );
}
