import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const TAGS_ANIMATION_DURATION = 150;

// Lottie fr=30 === Remotion 30fps → no frame conversion needed
// Easing extracted from keyframes: o={x:0.333,y:0}, i={x:0.667,y:1}
const EASE = Easing.bezier(0.333, 0, 0.667, 1);

// Total enter animation span (text is last to finish, at frame 21)
const ENTER_DURATION = 21;

// ─────────────────────────────────────────────────────────────────────────────
// Single tag item: white bar (fadeIn) + text (clipPath reveal) + red box (slide+rotate) + icon (independent slide)
// ─────────────────────────────────────────────────────────────────────────────
interface TagItemProps {
  text: string;
  icon: string;
  top: number;
  fontFamily: string;
  /** "clip" = clipPath reveal (Arabic text), "char" = per-character fadeIn (numbers) */
  revealMode?: "clip" | "char";
}

const TagItem = ({
  text,
  icon,
  top,
  fontFamily,
  revealMode = "clip",
}: TagItemProps) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // ── Reverse-frame for exit ────────────────────────────────────────────────
  const exitStart = durationInFrames - ENTER_DURATION;
  const reverseFrame = Math.max(
    0,
    Math.min(ENTER_DURATION, ENTER_DURATION - (frame - exitStart)),
  );
  const rf = frame >= exitStart ? reverseFrame : frame;

  // ── RED BOX (Layer 3 — image_1, 50×53) ───────────────────────────────────
  // Position x: 1035 → 944 = offset +91px right → 0, frames 0–12
  // Rotation: 12° → 0°, frames 0–5
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

  // ── ICON (Layer 1 — image_0, white overlay) ───────────────────────────────
  // Same +91px offset but 1 frame delayed: frames 1–13
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
  // Relative to red box (icon lags by 1 frame)
  const iconRelativeX = iconSlideXAbs - boxSlideX;

  // ── WHITE BAR (Layer 4) — fadeIn + same translateX as red box ──────────
  const barOpacity = interpolate(rf, [5, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  // Bar slides with the red box (same boxSlideX value)
  const barSlideX = boxSlideX;

  // ── TEXT reveal ──────────────────────────────────────────────────────────
  // Selector offset 0 → -100 over frames 4–21 → progress 0 → 1
  const textReveal = interpolate(rf, [4, 21], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  // clipPath mode: inset(top right bottom left) — reveals from right
  const textClip = `inset(0 0 0 ${(1 - textReveal) * 100}%)`;

  // char mode: stagger per character (safe for numbers/LTR)
  const chars = Array.from(text);
  const nChars = chars.length;

  return (
    <>
      {/* ── WHITE BAR — fadeIn + translateX with red box ─────────────────── */}
      <div
        style={{
          position: "absolute",
          top,
          right: 161, // red box left edge: right:111 + width:50
          height: 53,
          display: "inline-flex",
          alignItems: "center",
          background: "linear-gradient(180deg, #ffffff 11.5%, #c2c2c2 88.5%)",
          opacity: barOpacity,
          transform: `translateX(${barSlideX}px)`,
        }}
      >
        {/* Hidden text sets the bar width correctly */}
        <div
          style={{
            fontFamily,
            fontSize: 35,
            padding: "0 15px",
            whiteSpace: "nowrap",
            color: "transparent",
            userSelect: "none",
          }}
        >
          {text}
        </div>
      </div>

      {/* ── TEXT ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top,
          right: 176, // bar right (161) + left padding (15)
          height: 53,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          transform: `translateX(${barSlideX}px)`,
          pointerEvents: "none",
        }}
      >
        {revealMode === "clip" ? (
          // clipPath: full text revealed as one unit (preserves Arabic ligatures)
          <div
            style={{
              fontFamily,
              fontSize: 35,
              whiteSpace: "nowrap",
              clipPath: textClip,
            }}
          >
            {text}
          </div>
        ) : (
          // char-by-char right-to-left: rightmost char (last index) animates first
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {chars.map((char, i) => {
              // Reverse: i=0 is leftmost char → animates last
              //          i=nChars-1 is rightmost → animates first
              const revI = nChars - 1 - i;
              const charStart = nChars <= 1 ? 4 : 4 + (revI / (nChars - 1)) * 17;
              const charEnd = Math.min(charStart + 5, 22);
              const charOpacity = interpolate(rf, [charStart, charEnd], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE,
              });
              return (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    fontFamily,
                    fontSize: 35,
                    opacity: charOpacity,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* ── RED BOX — slides from right with rotation ────────────────────── */}
      <div
        style={{
          position: "absolute",
          top,
          right: 111,
          width: 50,
          height: 53,
          background: "linear-gradient(180deg, #e61f30 11.5%, #b31925 88.5%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateX(${boxSlideX}px) rotate(${boxRotation}deg)`,
          opacity: boxOpacity,
          transformOrigin: "center center",
        }}
      >
        {/* Icon — independent slide (1 frame delayed relative to box) */}
        <Img
          src={staticFile(icon)}
          style={{
            transform: `translateX(${iconRelativeX}px)`,
            opacity: iconOpacity,
          }}
        />
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

interface TagsAnimationProps {
  location?: string;
  date?: string;
  fontFamily: string;
}

export default function TagsAnimation({
  location,
  date,
  fontFamily,
}: TagsAnimationProps) {
  return (
    <AbsoluteFill>
      {/* Date tag — numbers → per-character fadeIn (no ligature issue) */}
      {date && (
        <TagItem
          text={date}
          icon="rassadtunisia/icons/date.png"
          top={130}
          fontFamily={fontFamily}
          revealMode="char"
        />
      )}
      {/* Location tag */}
      {location && (
        <TagItem
          text={location}
          icon="rassadtunisia/icons/location.png"
          top={200}
          fontFamily={fontFamily}
        />
      )}
    </AbsoluteFill>
  );
};
