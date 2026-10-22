import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { f } from "../../utils/constants";

// All frame numbers below are written for 30fps. f() converts them to the video fps.
export const SOURCE_ANIMATION_DURATION = f(270);

const EASE_OUT = Easing.bezier(0.22, 1, 0.36, 1); // fast start, soft landing
const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1); // smooth start and end

const CLAMP = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

// Everything is centered on this x position (canvas is 1080 wide)
const CENTER_X = 886;
const CAMERA_Y = 760;
const DIVIDER_Y = 790;
const TEXT_TOP = 808;

function CameraIcon() {
  // Camera drawn from the Lottie shapes: rounded body + lens triangle
  return (
    <svg
      width={40}
      height={24}
      style={{
        position: "absolute",
        left: CENTER_X - 20,
        top: CAMERA_Y - 12,
      }}
    >
      <g transform="translate(20 12)">
        <rect x={-19.55} y={-10.35} width={27.6} height={20.7} rx={3.45} fill="#F4F4F2" />
        <polygon points="8.05,-5.75 19.55,-11.5 19.55,11.5 8.05,5.75" fill="#F4F4F2" />
      </g>
    </svg>
  );
}

export default function SourceAnimation({
  source,
  fontFamily,
}: {
  source?: string;
  fontFamily: string;
}) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  if (!source) return null;

  // Frame counted back from the end of the sequence, so the exit works for any duration
  const fromEnd = (n: number) => durationInFrames - f(n);

  // One value drives everything: 0 = hidden, 1 = fully shown
  const reveal = Math.min(
    interpolate(frame, [f(3), f(27)], [0, 1], { ...CLAMP, easing: EASE_OUT }),
    interpolate(frame, [fromEnd(25.5), fromEnd(7.5)], [1, 0], {
      ...CLAMP,
      easing: EASE_IN_OUT,
    }),
  );

  // Camera fades in during the first third of the reveal
  const cameraOpacity = 0.88 * Math.min(reveal * 3, 1);

  // Red divider pops in once the reveal is almost done (same as the Lottie)
  const dividerVisible = reveal > 0.85;

  return (
    <AbsoluteFill>
      <div style={{ opacity: cameraOpacity }}>
        <CameraIcon />
      </div>

      {dividerVisible && (
        <div
          style={{
            position: "absolute",
            left: CENTER_X - 14,
            top: DIVIDER_Y - 1.5,
            width: 28,
            height: 3,
            backgroundColor: "#E31B23",
          }}
        />
      )}

      {/* Window that hides the text until it rises into place (12px extra space below the text) */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X - 40,
          top: 796,
          width: 80,
          paddingTop: TEXT_TOP - 796,
          paddingBottom: 12,
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Vertical text, rotated 90 degrees clockwise. It rises from below by its own length + 40px */}
        <div
          dir="rtl"
          style={{
            writingMode: "vertical-rl",
            whiteSpace: "nowrap",
            fontFamily,
            fontSize: 30,
            lineHeight: "36px",
            color: "#F4F4F2",
            opacity: 0.88,
            transform: `translateY(calc(${1 - reveal} * (100% + 40px)))`,
          }}
        >
          {`المصدر: ${source}`}
        </div>
      </div>
    </AbsoluteFill>
  );
}
