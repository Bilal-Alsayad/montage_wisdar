import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import SpeakerDecoration from "./SpeakerDecoration";

export const SPEAKER_ANIMATION_DURATION = 187;

// The enter animation spans 7 steps (0–6), each 2 frames apart → 14 frames total
// The exit mirrors the enter using the reverse-frame technique
const LAST_ANIMATION_FRAME = 6;

const getAnimationFrame = (frame: number, durationInFrames: number) => {
  const outroStart = durationInFrames - (LAST_ANIMATION_FRAME + 1);

  if (frame <= LAST_ANIMATION_FRAME) {
    return frame;
  }

  if (frame < outroStart) {
    return LAST_ANIMATION_FRAME;
  }

  return Math.max(0, durationInFrames - 1 - frame);
};

// Main component

interface SpeakerAnimationProps {
  name: string;
  description: string;
  fontFamily: string;
}

export default function SpeakerAnimation({
  name,
  description,
  fontFamily,
}: SpeakerAnimationProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const animationFrame = getAnimationFrame(frame, durationInFrames);

  // Step visibility flags (fr=30, steps are hold-frames, no easing needed)
  const showGhostRed         = animationFrame >= 0 && animationFrame <= 2;
  const ghostWhiteOpacity    = animationFrame === 1 ? 0.25 : animationFrame === 2 ? 0.5 : 0;
  const showMainRed          = animationFrame >= 3;
  const thirdRowWhiteOpacity = animationFrame === 4 ? 0.5 : animationFrame === 5 ? 1 : 0;
  const showSecondRowWhite   = animationFrame >= 6;
  const showName             = animationFrame >= 3;
  const showDescription      = animationFrame >= 6;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 118,
          top: 962,
          width: "fit-content",
          height: 52 * 4,
          overflow: "visible",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <SpeakerDecoration x={-59} y={-353} scale={0.3} />

        {/* Ghost red bar */}
        {showGhostRed ? (
          <div
            style={{
              position: "absolute",
              left: -14,
              top: 52 * 2,
              width: "fit-content",
              height: 52,
              background: "linear-gradient(90deg, #b50815 30%, #ef3038 100%)",
              opacity: 0.15,
            }}
          />
        ) : null}

        {/* Ghost white bar */}
        {ghostWhiteOpacity > 0 ? (
          <div
            style={{
              position: "absolute",
              left: -14,
              top: 52 * 2,
              width: "fit-content",
              height: 52,
              backgroundColor: "#f5f5f5",
              opacity: ghostWhiteOpacity,
            }}
          />
        ) : null}

        {/* Main red bar with name text */}
        {showMainRed ? (
          <div
            style={{
              position: "absolute",
              left: -14,
              top: 0,
              width: "fit-content",
              height: 52,
              background: "linear-gradient(90deg, #b50815 30%, #ef3038 100%)",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              boxSizing: "border-box",
              paddingLeft: 14,
              paddingRight: 14,
            }}
          >
            {showName ? (
              <span
                style={{
                  color: "#ffffff",
                  fontFamily,
                  fontSize: 24,
                  fontWeight: 600,
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  unicodeBidi: "plaintext",
                }}
              >
                {name}
              </span>
            ) : null}
          </div>
        ) : null}

        {/* Third row white flash (frame 4–5) */}
        {thirdRowWhiteOpacity > 0 ? (
          <div
            style={{
              position: "absolute",
              left: -14,
              top: 52 * 2,
              width: "fit-content",
              height: 52,
              backgroundColor: "#f5f5f5",
              opacity: thirdRowWhiteOpacity,
            }}
          />
        ) : null}

        {/* Second row white bar with description (frame 6+) */}
        {showSecondRowWhite ? (
          <div
            style={{
              position: "absolute",
              left: -14,
              top: 52 + 4,
              width: "fit-content",
              height: 52,
              backgroundColor: "#f5f5f5",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              boxSizing: "border-box",
              paddingLeft: 14,
              paddingRight: 14,
            }}
          >
            {showDescription ? (
              <span
                style={{
                  color: "#666666",
                  fontFamily,
                  fontSize: 22,
                  fontWeight: 400,
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  unicodeBidi: "plaintext",
                }}
              >
                {description}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
}
