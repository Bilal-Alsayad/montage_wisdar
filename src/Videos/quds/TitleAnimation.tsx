import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { splitTitle } from "../../utils/textUtils";

// ─── Lottie data.json analysis (fr: 30fps === Remotion 30fps, × 1.0) ───────────
//
// Shape Layer 3 (box behind Text 01, color #CDBAA3):
//   scaleX: 0 → 100 at t: 4 → 49   (enter)
//           hold  100 at t: 49 → 106
//           100 → 0  at t: 106 → 151 (exit)
//   easing: o.x=0.5, o.y=0, i.x=0.5, i.y=1 → Easing.bezier(0.5, 0, 0.5, 1)
//
// Shape Layer 4 (box behind Text 02, color #000000):
//   scaleX: 0 → 100 at t: 0 → 45   (enter)
//           hold  100 at t: 45 → 102
//           100 → 0  at t: 102 → 147 (exit)
//   easing: same → Easing.bezier(0.5, 0, 0.5, 1)
//
// Text timing (TEXT_DELAY = 8 frames):
//   Text 01 enter: 12→57, Text 01 exit: 98→143  (text trails box by 8f on enter, leads box by 8f on exit)
//   Text 02 enter:  8→53, Text 02 exit: 94→139
//
// Total composition: op=152 frames @ 30fps

export const TITLE_ANIMATION_DURATION = 152; // Lottie op=152 @ 30fps

// ─── Easing ─────────────────────────────────────────────────────────────────────
const EASE_BOX = Easing.bezier(0.5, 0, 0.5, 1); // o.x=0.5, o.y=0, i.x=0.5, i.y=1
const EASE_TEXT = Easing.bezier(0.333, 0, 0.667, 1); // o.x=0.333, o.y=0, i.x=0.667, i.y=1

type TitleAnimationProps = {
  text: string;
  fontFamily: string;
};

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const { text1, text2 } = splitTitle(text);

  // ─── Box 1 (Text 01 background — #CDBAA3) ───────────────────────────────────
  // Enter: scaleX 0→1 at frames 4→49
  // Exit:  scaleX 1→0 at frames 106→151
  const box1EnterScale = interpolate(frame, [4, 49], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_BOX,
  });
  const box1ExitScale = interpolate(frame, [106, 151], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_BOX,
  });
  const box1Scale = frame < 106 ? box1EnterScale : box1ExitScale;

  // ─── Box 2 (Text 02 background — #000000) ───────────────────────────────────
  // Enter: scaleX 0→1 at frames 0→45
  // Exit:  scaleX 1→0 at frames 102→147
  const box2EnterScale = interpolate(frame, [0, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_BOX,
  });
  const box2ExitScale = interpolate(frame, [102, 147], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_BOX,
  });
  const box2Scale = frame < 102 ? box2EnterScale : box2ExitScale;

  // ─── Text offsets: box leads enter by ENTER_DELAY, text leads exit by EXIT_ADVANCE ──
  const ENTER_DELAY = 4; // frames box starts before text on enter
  const EXIT_ADVANCE = 4; // frames text starts exiting before box

  // ─── Text 01 sweep reveal ────────────────────────────────────────────────────
  // Enter: 4+8=12 → 49+8=57
  // Exit:  106−14=92 → 151−14=137
  const text1EnterProgress = interpolate(
    frame,
    [4 + ENTER_DELAY, 49 + ENTER_DELAY],
    [0, 1],
    {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_TEXT,
  });
  const text1ExitProgress = interpolate(frame, [106 - EXIT_ADVANCE, 151 - EXIT_ADVANCE], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_TEXT,
  });
  const text1Progress = frame < (106 - EXIT_ADVANCE) ? text1EnterProgress : text1ExitProgress;
  const text1Clip = `inset(0 ${(1 - text1Progress) * 100}% 0 0)`;

  // ─── Text 02 sweep reveal ────────────────────────────────────────────────────
  // Enter: 0+8=8 → 45+8=53
  // Exit:  102−14=88 → 147−14=133
  const text2EnterProgress = interpolate(frame, [0 + ENTER_DELAY, 45 + ENTER_DELAY], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_TEXT,
  });
  const text2ExitProgress = interpolate(frame, [102 - EXIT_ADVANCE, 147 - EXIT_ADVANCE], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_TEXT,
  });
  const text2Progress = frame < (102 - EXIT_ADVANCE) ? text2EnterProgress : text2ExitProgress;
  const text2Clip = `inset(0 ${(1 - text2Progress) * 100}% 0 0)`;

  return (
    <div
      style={{
        position: "absolute",
        top: 1500,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 20,
        fontFamily,
        fontSize: 80,
        direction: "ltr",
      }}
    >
      {/* Text 01 — beige/tan box */}
      <div
        style={{
          position: "relative",
          height: 100,
          overflow: "hidden",
        }}
      >
        {/* Animated background box — scales from center outward */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#CDBAA3",
            transform: `scaleX(${box1Scale})`,
            transformOrigin: "left center",
          }}
        />
        {/* Text clipped to reveal in sync with box */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            height: "100%",
            color: "#000000",
            padding: "0 20px",
            whiteSpace: "nowrap",
            clipPath: text1Clip,
          }}
        >
          {text1}
        </div>
      </div>

      {/* Text 02 — black box */}
      <div
        style={{
          position: "relative",
          height: 100,
          overflow: "hidden",
        }}
      >
        {/* Animated background box — scales from center outward */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#000000",
            transform: `scaleX(${box2Scale})`,
            transformOrigin: "left center",
          }}
        />
        {/* Text clipped to reveal in sync with box */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            height: "100%",
            color: "#ffffff",
            padding: "0 20px",
            whiteSpace: "nowrap",
            clipPath: text2Clip,
          }}
        >
          {text2}
        </div>
      </div>
    </div>
  );
}
