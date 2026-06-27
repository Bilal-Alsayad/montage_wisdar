import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";

// ─── Lottie data.json: fr=25fps, Remotion=30fps → multiplier = 1.2 ────────────
// Layer 3 (circle icon, parent=text layer):
//   Position X: t 0→12 @ 25fps → 0→14 @ 30fps | from=−109.6px to=0
//   Rotation:   t 0→12 @ 25fps → 0→14 @ 30fps | 110°→0°
//   Opacity:    t 0→5  @ 25fps → 0→6  @ 30fps  | 0→1
// Layer 2 (checkmark, enters AFTER circle settles):
//   Opacity:    t 1→6  @ 25fps → 1→7  @ 30fps  | 0→1
//   Rotation:   t 1→13 @ 25fps → 1→16 @ 30fps  | 46°→0°
//   Scale:      t 1→15 @ 25fps → 1→18 @ 30fps  | 42%→100%
// Layer 1 (text):
//   Opacity:    t 3→16 @ 25fps → 4→19 @ 30fps  | 0→1
// Exit starts at: t=71 @ 25fps → frame 85 @ 30fps

// ─── Easing constants (from Lottie bezier tangents) ──────────────────────────
// Most transitions: o={x:0.333,y:0} i={x:0.667,y:1} → standard ease-in-out
const EASE = Easing.bezier(0.333, 0, 0.667, 1);
// Circle position/rotation: o={x:0.333,y:0} i={x:0.833,y:0.833} — slightly overshoot
const CIRCLE_EASE = Easing.bezier(0.333, 0, 0.833, 0.833);
// Checkmark scale enter: o={x:0.333,y:0} i={x:0.162,y:1} — aggressive deceleration
const CHECKMARK_EASE = Easing.bezier(0.333, 0, 0.162, 1);

// ─── Timing constants (in Remotion 30fps frames) ─────────────────────────────
// Enter
const CIRCLE_ENTER_END = 14;    // circle finishes settling
const CHECK_OPACITY_END = 7;    // checkmark fades in
const CHECK_ROT_END = 16;       // checkmark rotation done
const CHECK_SCALE_END = 18;     // checkmark scale done (longest enter)
const TEXT_ENTER_START = 4;
const TEXT_ENTER_END = 19;

// Exit
const ENTER_DURATION = CHECK_SCALE_END; // 18 frames — used for reverse-frame
const EXIT_START = 85;                  // t=71 @ 25fps → 85 @ 30fps

export const SOURCE_ANIMATION_DURATION = EXIT_START + ENTER_DURATION + 2;

export interface SourceAnimationProps {
  source?: string;
  fontFamily: string;
}

export function SourceAnimation({ source, fontFamily }: SourceAnimationProps) {
  const frame = useCurrentFrame();

  if (!source) return null;

  // ─── Reverse-frame for exit animations ─────────────────────────────────────
  const reverseFrame = Math.max(
    0,
    Math.min(ENTER_DURATION, ENTER_DURATION - (frame - EXIT_START))
  );

  const isExiting = frame >= EXIT_START;

  // ─── Circle: Enter ─────────────────────────────────────────────────────────
  // Position X: slides in from the left (offset = -109.6px relative to text layer)
  const circleEnterX = interpolate(
    frame,
    [0, CIRCLE_ENTER_END],
    [-110, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: CIRCLE_EASE }
  );
  // Rotation: spins from 110° to 0° as it flies in
  const circleEnterRot = interpolate(
    frame,
    [0, CIRCLE_ENTER_END],
    [110, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: CIRCLE_EASE }
  );
  // Opacity: quick fade-in
  const circleEnterOpacity = interpolate(
    frame,
    [0, 6],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }
  );

  // ─── Circle: Exit (reverse-frame) ──────────────────────────────────────────
  const circleExitX = interpolate(
    reverseFrame,
    [0, CIRCLE_ENTER_END],
    [-110, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: CIRCLE_EASE }
  );
  const circleExitRot = interpolate(
    reverseFrame,
    [0, CIRCLE_ENTER_END],
    [110, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: CIRCLE_EASE }
  );
  const circleExitOpacity = interpolate(
    reverseFrame,
    [0, 6],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }
  );

  // ─── Circle: Combined ──────────────────────────────────────────────────────
  const circleX = isExiting ? circleExitX : circleEnterX;
  const circleRot = isExiting ? circleExitRot : circleEnterRot;
  const circleOpacity = Math.min(circleEnterOpacity, circleExitOpacity);

  // ─── Checkmark: Enter (starts AFTER circle settles) ───────────────────────
  // Opacity: quick fade-in right after circle lands
  const checkEnterOpacity = interpolate(
    frame,
    [CIRCLE_ENTER_END, CIRCLE_ENTER_END + CHECK_OPACITY_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }
  );
  // Rotation: 46° → 0°, giving the "snap into place" feel
  const checkEnterRot = interpolate(
    frame,
    [CIRCLE_ENTER_END, CIRCLE_ENTER_END + CHECK_ROT_END],
    [46, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }
  );
  // Scale: 42% → 100% with slight bounce feel
  const checkEnterScale = interpolate(
    frame,
    [CIRCLE_ENTER_END, CIRCLE_ENTER_END + CHECK_SCALE_END],
    [0.42, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: CHECKMARK_EASE }
  );

  // ─── Checkmark: Exit (reverse-frame, offset by CIRCLE_ENTER_END) ──────────
  const checkRevFrame = Math.max(
    0,
    Math.min(
      CIRCLE_ENTER_END + CHECK_SCALE_END,
      CIRCLE_ENTER_END + CHECK_SCALE_END - (frame - EXIT_START)
    )
  );
  const checkExitOpacity = interpolate(
    checkRevFrame,
    [CIRCLE_ENTER_END, CIRCLE_ENTER_END + CHECK_OPACITY_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }
  );
  const checkExitRot = interpolate(
    checkRevFrame,
    [CIRCLE_ENTER_END, CIRCLE_ENTER_END + CHECK_ROT_END],
    [46, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }
  );
  const checkExitScale = interpolate(
    checkRevFrame,
    [CIRCLE_ENTER_END, CIRCLE_ENTER_END + CHECK_SCALE_END],
    [0.42, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: CHECKMARK_EASE }
  );

  // ─── Checkmark: Combined ───────────────────────────────────────────────────
  const checkOpacity = Math.min(checkEnterOpacity, checkExitOpacity);
  const checkRot = isExiting ? checkExitRot : checkEnterRot;
  const checkScale = isExiting
    ? Math.min(checkEnterScale, checkExitScale)
    : checkEnterScale;

  // ─── Text: Enter + Exit ────────────────────────────────────────────────────
  const textEnterOpacity = interpolate(
    frame,
    [TEXT_ENTER_START, TEXT_ENTER_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }
  );
  const textExitOpacity = interpolate(
    reverseFrame,
    [TEXT_ENTER_START, TEXT_ENTER_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }
  );
  const textOpacity = Math.min(textEnterOpacity, textExitOpacity);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 180,
          right: 50,
          direction: "rtl",
          fontFamily,
          fontSize: 41,
          color: "#ffffff",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
        }}
      >
        {/* ── Icon wrapper: slides and rotates into place ── */}
        <div
          style={{
            opacity: circleOpacity,
            transform: `translateX(${circleX}px) rotate(${circleRot}deg)`,
            width: 45,
            height: 45,
            position: "relative",
            flexShrink: 0,
          }}
        >
          {/* Circle ring */}
          <svg
            viewBox="0 0 45 45"
            fill="none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 45,
              height: 45,
            }}
          >
            <circle
              cx="18"
              cy="18"
              r="14"
              stroke="white"
              strokeWidth="4"
              fill="none"
            />
            {/* Search handle */}
            <line
              x1="28"
              y1="28"
              x2="43"
              y2="43"
              stroke="white"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Checkmark — appears AFTER circle settles, snaps into place */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 45,
              height: 45,
              opacity: checkOpacity,
              transform: `rotate(${checkRot}deg) scale(${checkScale})`,
              transformOrigin: "18px 18px",
            }}
          >
            <svg
              viewBox="0 0 45 45"
              fill="none"
              style={{ width: 45, height: 45 }}
            >
              <polyline
                points="11,18 16,23 25,13"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* ── Source text ── */}
        <span style={{ opacity: textOpacity }}>{source}</span>
      </div>
    </AbsoluteFill>
  );
}
