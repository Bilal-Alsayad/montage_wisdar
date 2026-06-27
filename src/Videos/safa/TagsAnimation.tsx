import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { charEnter, EASE, reverseFrameOf } from "./animations";

// ─── Duration (frames at 30fps) ───────────────────────────────────────────────
// Lottie: fr=50, op=210 → enter comp ip=0 op=105 @ sr=1
// 105 × 0.6 = 63 Remotion frames (enter)
// Exit reversed layer: ip=210 @ sr=-1 → 210×0.6 = 126 Remotion
export const TAGS_ANIMATION_DURATION = 126; // Remotion frames @ 30fps

interface TagsAnimationProps {
  fontFamily: string;
  date?: string;
  location?: string;
}

export default function TagsAnimation({
  fontFamily,
  date,
  location,
}: TagsAnimationProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // ─── Lottie → Remotion conversion (×0.6) ─────────────────────────────────
  // Location icon (Layer 7 / image_0):
  //   opacity: Lottie t=2→17  → Remotion 1→10
  //   slideX:  87→121 = +34px, Lottie t=-2→16 → clamp 0→10 Remotion
  const LOC_ICON_OP_START = 1;
  const LOC_ICON_OP_END   = 10;
  const LOC_ICON_SL_END   = 10;

  // Location text animator sweep: Lottie t=0→39 → Remotion 0→23
  const LOC_SWEEP_START = 0;
  const LOC_SWEEP_END   = Math.round(39 * 0.6); // 23

  // Date icon (Layer 4 / image_1):
  //   opacity: Lottie t=9→29  → Remotion 5→17
  //   slideX:  +34px, Lottie t=-1→28 → clamp 0→17 Remotion
  const DATE_ICON_OP_START = Math.round(9  * 0.6); // 5
  const DATE_ICON_OP_END   = Math.round(29 * 0.6); // 17
  const DATE_ICON_SL_END   = Math.round(28 * 0.6); // 17

  // Date text animator sweep: Lottie t=5→44 → Remotion 3→26
  const DATE_SWEEP_START = Math.round(5  * 0.6); // 3
  const DATE_SWEEP_END   = Math.round(44 * 0.6); // 26

  // Enter duration = last enter keyframe
  const ENTER_DURATION = DATE_SWEEP_END; // 26

  const { reverseFrame, isExiting } = reverseFrameOf(frame, ENTER_DURATION, durationInFrames);
  const evalFrame = isExiting ? reverseFrame : frame;

  // ─── Location icon ────────────────────────────────────────────────────────
  const locIconOpacity = interpolate(evalFrame, [LOC_ICON_OP_START, LOC_ICON_OP_END], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE,
  });
  const locIconSlideX = interpolate(evalFrame, [0, LOC_ICON_SL_END], [-34, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE,
  });

  // ─── Date icon ────────────────────────────────────────────────────────────
  const dateIconOpacity = interpolate(
    evalFrame, [DATE_ICON_OP_START, DATE_ICON_OP_END], [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }
  );
  const dateIconSlideX = interpolate(
    evalFrame, [DATE_ICON_OP_START, DATE_ICON_SL_END], [-34, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }
  );

  // ─── Character arrays ─────────────────────────────────────────────────────
  const locationChars = Array.from(location ?? "");
  const dateChars     = Array.from(date ?? "");

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 390,
          left: 100,
          fontFamily,
          fontSize: 25,
          color: "#ffffff",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* ── Location row ─────────────────────────────────────────────── */}
        {location && (
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* Icon — fade + slideX (same offset as text animator: 34px) */}
            <div style={{ opacity: locIconOpacity, transform: `translateX(${locIconSlideX}px)` }}>
              <Img src={staticFile("safa/icons/location.png")} />
            </div>

            {/* Text — per-character charEnter */}
            <span style={{ display: "inline-flex", overflow: "hidden" }}>
              {locationChars.map((char, i) => {
                const { opacity, translateX } = charEnter(evalFrame, i, locationChars.length, LOC_SWEEP_START, LOC_SWEEP_END);
                return (
                  <span key={i} style={{ display: "inline-block", opacity, transform: `translateX(${translateX}px)`, whiteSpace: "pre" }}>
                    {char}
                  </span>
                );
              })}
            </span>
          </div>
        )}

        {/* ── Date row ─────────────────────────────────────────────────── */}
        {date && (
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* Icon — fade + slideX */}
            <div style={{ opacity: dateIconOpacity, transform: `translateX(${dateIconSlideX}px)` }}>
              <Img src={staticFile("safa/icons/date.png")} />
            </div>

            {/* Text — per-character charEnter */}
            <span style={{ display: "inline-flex", overflow: "hidden" }}>
              {dateChars.map((char, i) => {
                const { opacity, translateX } = charEnter(evalFrame, i, dateChars.length, DATE_SWEEP_START, DATE_SWEEP_END);
                return (
                  <span key={i} style={{ display: "inline-block", opacity, transform: `translateX(${translateX}px)`, whiteSpace: "pre" }}>
                    {char}
                  </span>
                );
              })}
            </span>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
}
