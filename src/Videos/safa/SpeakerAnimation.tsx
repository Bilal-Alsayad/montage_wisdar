import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { charEnter, EASE, reverseFrameOf } from "./animations";

// ─── Duration (frames at 30fps) ───────────────────────────────────────────────
// Lottie: fr=50, op=264 → enter comp ip=0 op=119 @ sr=1
// 119 × 0.6 = 71.4 → ~72 Remotion frames (enter)
// Exit reversed layer: ip=237 @ sr=-1 → 237×0.6 = 142.2 → ~142 Remotion
export const SPEAKER_ANIMATION_DURATION = 142; // Remotion frames @ 30fps

interface SpeakerAnimationProps {
  fontFamily: string;
  name: string;
  description: string;
}

export default function SpeakerAnimation({
  fontFamily,
  name,
  description,
}: SpeakerAnimationProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // ─── Lottie → Remotion conversion (×0.6) ─────────────────────────────────
  // Blue box bg (Rectangle 1 copy 5 / image_0):
  //   opacity + slideX: Lottie t=0→9  → Remotion 0→5
  //   slideX: 369.904→386.904 = +17px, Lottie t=-3→10 → 0→6 Remotion
  const BLUE_BG_OP_END  = Math.round(9  * 0.6); // 5
  const BLUE_BG_SL_END  = Math.round(10 * 0.6); // 6

  // White box bg (Rectangle 1 copy 5 / image_1):
  //   opacity: Lottie t=5→13 → Remotion 3→8
  //   slideX: 357→385 = +28px, Lottie t=2→12 → 1→7 Remotion
  const WHITE_BG_OP_START = Math.round(5  * 0.6); // 3
  const WHITE_BG_OP_END   = Math.round(13 * 0.6); // 8
  const WHITE_BG_SL_START = Math.round(2  * 0.6); // 1
  const WHITE_BG_SL_END   = Math.round(12 * 0.6); // 7

  // title1 text = name:
  //   layer opacity: Lottie t=5→14 → Remotion 3→8
  //   text animator sweep: Lottie t=6→45 → Remotion 4→27
  const NAME_LAYER_OP_START = Math.round(5  * 0.6); // 3
  const NAME_LAYER_OP_END   = Math.round(14 * 0.6); // 8
  const NAME_SWEEP_START    = Math.round(6  * 0.6); // 4
  const NAME_SWEEP_END      = Math.round(45 * 0.6); // 27

  // title2 text = description:
  //   layer opacity: Lottie t=0→9 → Remotion 0→5
  //   text animator sweep: Lottie t=1→40 → Remotion 1→24
  const DESC_LAYER_OP_END  = Math.round(9  * 0.6); // 5
  const DESC_SWEEP_START   = Math.round(1  * 0.6); // 1
  const DESC_SWEEP_END     = Math.round(40 * 0.6); // 24

  // Enter duration = last enter keyframe
  const ENTER_DURATION = NAME_SWEEP_END; // 27

  const { reverseFrame, isExiting } = reverseFrameOf(frame, ENTER_DURATION, durationInFrames);
  const evalFrame = isExiting ? reverseFrame : frame;

  // ─── Blue bg ───────────────────────────────────────────────────────────────
  const blueBgOpacity = interpolate(evalFrame, [0, BLUE_BG_OP_END], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE,
  });
  const blueBgSlideX = interpolate(evalFrame, [0, BLUE_BG_SL_END], [-17, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE,
  });

  // ─── White bg ──────────────────────────────────────────────────────────────
  const whiteBgOpacity = interpolate(
    evalFrame, [WHITE_BG_OP_START, WHITE_BG_OP_END], [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }
  );
  const whiteBgSlideX = interpolate(
    evalFrame, [WHITE_BG_SL_START, WHITE_BG_SL_END], [-28, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }
  );

  // ─── Layer-level opacity (mirrors Lottie layer ks.o keyframe) ──────────────
  const nameLayerOpacity = interpolate(
    evalFrame, [NAME_LAYER_OP_START, NAME_LAYER_OP_END], [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }
  );
  const descLayerOpacity = interpolate(
    evalFrame, [0, DESC_LAYER_OP_END], [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }
  );

  const nameChars = Array.from(name);
  const descChars = Array.from(description);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 1230,
          left: 100,
          fontFamily,
        }}
      >
        {/* ── Name block ─────────────────────────────────────────────────── */}
        <div
          style={{
            color: "#ffffff",
            fontSize: 35,
            backgroundColor: "#274975",
            height: 65,
            width: "fit-content",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 15px",
            borderTopLeftRadius: "25px",
            opacity: blueBgOpacity,
            transform: `translateX(${blueBgSlideX}px)`,
          }}
        >
          <span style={{ display: "inline-flex", opacity: nameLayerOpacity, overflow: "hidden" }}>
            {nameChars.map((char, i) => {
              const { opacity, translateX } = charEnter(evalFrame, i, nameChars.length, NAME_SWEEP_START, NAME_SWEEP_END);
              return (
                <span key={i} style={{ display: "inline-block", opacity, transform: `translateX(${translateX}px)`, whiteSpace: "pre" }}>
                  {char}
                </span>
              );
            })}
          </span>
        </div>

        {/* ── Description block ──────────────────────────────────────────── */}
        <div
          style={{
            color: "#274975",
            fontSize: 27,
            backgroundColor: "#ffffff",
            height: 52,
            width: "fit-content",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 15px",
            borderBottomRightRadius: "25px",
            opacity: whiteBgOpacity,
            transform: `translateX(${whiteBgSlideX}px)`,
          }}
        >
          <span style={{ display: "inline-flex", opacity: descLayerOpacity, overflow: "hidden" }}>
            {descChars.map((char, i) => {
              const { opacity, translateX } = charEnter(evalFrame, i, descChars.length, DESC_SWEEP_START, DESC_SWEEP_END);
              return (
                <span key={i} style={{ display: "inline-block", opacity, transform: `translateX(${translateX}px)`, whiteSpace: "pre" }}>
                  {char}
                </span>
              );
            })}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
}
