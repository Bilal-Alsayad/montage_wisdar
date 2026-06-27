import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Reuses the same timings verified from data.json (fr=30):
//   Box:  position 0–12, rotation 0–5, opacity 0–2
//   Icon: position+opacity 1–13
//   Bar:  opacity 5–10
//   Text: reveal 4–21
const ENTER_DURATION = 21;
const EASE = Easing.bezier(0.333, 0, 0.667, 1);


interface SourceAnimationProps {
  source?: string;
  fontFamily: string;
}

export const SourceAnimation = ({
  source,
  fontFamily,
}: SourceAnimationProps) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  if (!source) return null;

  // ── Reverse-frame for exit ────────────────────────────────────────────────
  const exitStart = durationInFrames - ENTER_DURATION;
  const reverseFrame = Math.max(
    0,
    Math.min(ENTER_DURATION, ENTER_DURATION - (frame - exitStart)),
  );
  const rf = frame >= exitStart ? reverseFrame : frame;

  // ── WHITE BOX (icon container) — slides from right with rotation ──────────
  // Same as TagsAnimation Layer 3: position 0–12, rotation 0–5, opacity 0–2
  const boxSlideX = interpolate(rf, [0, 12], [91, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const boxRotation = interpolate(rf, [0, 5], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const boxOpacity = interpolate(rf, [0, 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  // ── ICON — independent slide, 1 frame delayed (Layer 1: frames 1–13) ──────
  const iconSlideXAbs = interpolate(rf, [1, 13], [91, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const iconOpacity = interpolate(rf, [1, 13], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const iconRelativeX = iconSlideXAbs - boxSlideX;

  // ── BLACK BAR — fadeIn + translateX with the white box (Layer 4: frames 5–10) ─
  const barOpacity = interpolate(rf, [5, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const barSlideX = boxSlideX;

  // ── TEXT — clipPath reveal from right (Layer 2: frames 4–21) ─────────────
  const textReveal = interpolate(rf, [4, 21], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const textClip = `inset(0 0 0 ${(1 - textReveal) * 100}%)`;

  // SourceAnimation icon box dimensions (matches original: 56×46)
  const BOX_WIDTH = 56;
  const BOX_RIGHT = 110;
  const BAR_RIGHT = BOX_RIGHT + BOX_WIDTH; // 166

  return (
    <AbsoluteFill>
      {/* ── BLACK BAR — fadeIn + translateX ───────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 130,
          right: BAR_RIGHT,
          height: 46,
          display: "inline-flex",
          alignItems: "center",
          background: "#000000",
          opacity: barOpacity,
          transform: `translateX(${barSlideX}px)`,
        }}
      >
        {/* Hidden text sets correct bar width */}
        <div
          style={{
            fontFamily,
            fontSize: 26,
            padding: "0 15px",
            whiteSpace: "nowrap",
            color: "transparent",
            userSelect: "none",
          }}
        >
          {source}
        </div>
      </div>

      {/* ── TEXT — clipPath reveal from right ─────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 130,
          right: BAR_RIGHT + 15, // bar right + left padding
          height: 46,
          display: "flex",
          alignItems: "center",
          transform: `translateX(${barSlideX}px)`,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 26,
            whiteSpace: "nowrap",
            color: "#ffffff",
            clipPath: textClip,
          }}
        >
          {source}
        </div>
      </div>

      {/* ── WHITE BOX — slides from right with rotation ───────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 130,
          right: BOX_RIGHT,
          width: BOX_WIDTH,
          height: 46,
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateX(${boxSlideX}px) rotate(${boxRotation}deg)`,
          opacity: boxOpacity,
          transformOrigin: "center center",
        }}
      >
        {/* Icon — independent slide (1 frame delayed) */}
        <Img
          src={staticFile("rassadtunisia/icons/source.png")}
          style={{
            transform: `translateX(${iconRelativeX}px)`,
            opacity: iconOpacity,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};