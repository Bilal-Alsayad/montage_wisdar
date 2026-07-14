import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ─── Easing ────────────────────────────────────────────────────────────────────
// Extracted from Lottie data.json: o={x:0.333,y:0}, i={x:0.667,y:1}
const EASE = Easing.bezier(0.333, 0, 0.667, 1);

// ─── Timing constants (Lottie @23.976fps → Remotion @30fps, ×1.25) ────────────
//
// Lottie Null 1 exit keyframes: t=120 → t=133  →  Remotion: 150 → 166
// Exit slide: Null 1 y=960 → y=1804, delta=+844px (slides DOWN out of frame)
// Exit duration: (133 - 120) × 1.25 ≈ 16 Remotion frames
const EXIT_DURATION = 16;

export const TITLE_ANIMATION_DURATION = 170;

interface TitleAnimationProps {
  text: string;
  fontFamily: string;
}

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // ── Exit only: slide DOWN from 0 → +844px over EXIT_DURATION frames ──────────
  const exitStart = durationInFrames - EXIT_DURATION;
  const exitFrame = Math.max(0, frame - exitStart);

  const groupSlideY = interpolate(exitFrame, [0, EXIT_DURATION], [0, 844], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  return (
    <AbsoluteFill>
      {/* Mirrors the Lottie Null 1 parent controller — outro only */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          transform: `translateY(${groupSlideY}px)`,
        }}
      >
        {/* Icon (title.png) — child of Null 1 */}
        <div
          style={{
            position: "absolute",
            top: 100,
            right: 125,
          }}
        >
          <Img src={staticFile("diasporapulse/icons/title.png")} />
        </div>

        {/* Shadow background + text — children of Null 1 */}
        <div>
          <Img src={staticFile("diasporapulse/elements/shadow.png")} />
          <span
            style={{
              position: "absolute",
              right: 125,
              top: 280,
              fontFamily,
              fontSize: 65,
              color: "#ffffff",
              textAlign: "right",
              maxWidth: 830,
            }}
          >
            {text}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
}
