import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";

// ─── Lottie data.json analysis (fr: 25fps → Remotion 30fps, multiply × 1.2) ───
//
// Shape Layer 5 (name box):
//   ip: 5 → start frame 5×1.2 = 6
//   Position Y: 873.573 → 815.573 in frames 5→18 (Δ = -58px offset)
//   Opacity:    0 → 100   in frames 5→10
//   Color fill: white → red in frames 5→14
//   Easing: o:{x:0.322,y:0} / i:{x:1,y:1} (position), o:{x:0.333,y:0} / i:{x:0.667,y:1} (opacity/color)
//
// Shape Layer 6 (description box):
//   ip: 7 → start frame 7×1.2 = 8.4 ≈ 8
//   Position Y: 930.073 → 872.073 in frames 7→21 (Δ = -58px offset)
//   Opacity:    0 → 100   in frames 7→12
//   Color fill: red → white in frames 10→16
//   Easing: same pattern
//
// Text_1 (name text): clip-path reveal, frames 7→22 (easing: i:0.194,1 / o:0.333,0)
// Text_2 (desc text): clip-path reveal, frames 9→24 (easing: i:0.194,1 / o:0.333,0)

// ─── Easing curves (from Lottie keyframes: Easing.bezier(o.x, o.y, i.x, i.y)) ───
const EASE_SLIDE = Easing.bezier(0.333, 0, 0.322, 1);   // position translateY
const EASE_FADE  = Easing.bezier(0.333, 0, 0.667, 1);   // opacity & color
const EASE_TEXT  = Easing.bezier(0.333, 0, 0.194, 1);   // text clip-path reveal

interface SpeakerAnimationProps {
  name: string;
  description: string;
  nameFontFamily: string;
  descriptionFontFamily: string;
}

export default function SpeakerAnimation({
  name,
  description,
  nameFontFamily,
  descriptionFontFamily,
}: SpeakerAnimationProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // ─── Timing constants (Lottie frames × 1.2 for 30fps) ───
  // Name box (Shape Layer 5)
  const NAME_BOX_SLIDE_START  = 6;   // 5  × 1.2
  const NAME_BOX_SLIDE_END    = 22;  // 18 × 1.2
  const NAME_BOX_FADE_START   = 6;   // 5  × 1.2
  const NAME_BOX_FADE_END     = 12;  // 10 × 1.2
  const NAME_BOX_COLOR_START  = 6;   // 5  × 1.2
  const NAME_BOX_COLOR_END    = 17;  // 14 × 1.2

  // Description box (Shape Layer 6)
  const DESC_BOX_SLIDE_START  = 8;   // 7  × 1.2
  const DESC_BOX_SLIDE_END    = 25;  // 21 × 1.2
  const DESC_BOX_FADE_START   = 8;   // 7  × 1.2
  const DESC_BOX_FADE_END     = 14;  // 12 × 1.2
  const DESC_BOX_COLOR_START  = 12;  // 10 × 1.2
  const DESC_BOX_COLOR_END    = 19;  // 16 × 1.2

  // Text reveals
  const NAME_TEXT_START       = 8;   // 7  × 1.2
  const NAME_TEXT_END         = 26;  // 22 × 1.2
  const DESC_TEXT_START       = 11;  // 9  × 1.2
  const DESC_TEXT_END         = 29;  // 24 × 1.2

  // ─── Enter duration for exit reverse technique ───
  const ENTER_DURATION = DESC_BOX_SLIDE_END; // longest enter animation span

  // ─── Exit (reverse-frame technique) ───
  const exitStart = durationInFrames - ENTER_DURATION;
  const reverseFrame = Math.max(
    0,
    Math.min(ENTER_DURATION, ENTER_DURATION - (frame - exitStart))
  );

  // ─── Name box animations ───
  const nameBoxSlideEnter = interpolate(
    frame,
    [NAME_BOX_SLIDE_START, NAME_BOX_SLIDE_END],
    [58, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_SLIDE }
  );
  const nameBoxSlideExit = interpolate(
    reverseFrame,
    [NAME_BOX_SLIDE_START, NAME_BOX_SLIDE_END],
    [58, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_SLIDE }
  );
  const nameBoxTranslateY = frame >= exitStart ? nameBoxSlideExit : nameBoxSlideEnter;

  const nameBoxOpacityEnter = interpolate(
    frame,
    [NAME_BOX_FADE_START, NAME_BOX_FADE_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_FADE }
  );
  const nameBoxOpacityExit = interpolate(
    reverseFrame,
    [NAME_BOX_FADE_START, NAME_BOX_FADE_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_FADE }
  );
  const nameBoxOpacity = Math.min(nameBoxOpacityEnter, nameBoxOpacityExit);

  // Name box color: white → red on enter, red → white on exit (reverse-frame)
  const nameBoxColorEnterT = interpolate(
    frame,
    [NAME_BOX_COLOR_START, NAME_BOX_COLOR_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_FADE }
  );
  const nameBoxColorExitT = interpolate(
    reverseFrame,
    [NAME_BOX_COLOR_START, NAME_BOX_COLOR_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_FADE }
  );
  // On exit: reverseFrame shrinks → colorT shrinks → color goes back to white
  const nameBoxColorT = frame >= exitStart ? nameBoxColorExitT : nameBoxColorEnterT;
  // Lerp: [255,255,255] (white) → [230,31,48] (red #e61f30)
  const nameBoxR = Math.round(interpolate(nameBoxColorT, [0, 1], [255, 230]));
  const nameBoxG = Math.round(interpolate(nameBoxColorT, [0, 1], [255, 31]));
  const nameBoxB = Math.round(interpolate(nameBoxColorT, [0, 1], [255, 48]));
  const nameBoxBg = `rgb(${nameBoxR}, ${nameBoxG}, ${nameBoxB})`;

  // ─── Description box animations ───
  const descBoxSlideEnter = interpolate(
    frame,
    [DESC_BOX_SLIDE_START, DESC_BOX_SLIDE_END],
    [58, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_SLIDE }
  );
  const descBoxSlideExit = interpolate(
    reverseFrame,
    [DESC_BOX_SLIDE_START, DESC_BOX_SLIDE_END],
    [58, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_SLIDE }
  );
  const descBoxTranslateY = frame >= exitStart ? descBoxSlideExit : descBoxSlideEnter;

  const descBoxOpacityEnter = interpolate(
    frame,
    [DESC_BOX_FADE_START, DESC_BOX_FADE_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_FADE }
  );
  const descBoxOpacityExit = interpolate(
    reverseFrame,
    [DESC_BOX_FADE_START, DESC_BOX_FADE_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_FADE }
  );
  const descBoxOpacity = Math.min(descBoxOpacityEnter, descBoxOpacityExit);

  // Description box color: red → white on enter, white → red on exit (reverse-frame)
  const descBoxColorEnterT = interpolate(
    frame,
    [DESC_BOX_COLOR_START, DESC_BOX_COLOR_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_FADE }
  );
  const descBoxColorExitT = interpolate(
    reverseFrame,
    [DESC_BOX_COLOR_START, DESC_BOX_COLOR_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_FADE }
  );
  // On exit: reverseFrame shrinks → colorT shrinks → color goes back to red
  const descBoxColorT = frame >= exitStart ? descBoxColorExitT : descBoxColorEnterT;
  // Lerp: [230,31,48] (red #e61f30) → [255,255,255] (white)
  const descBoxR = Math.round(interpolate(descBoxColorT, [0, 1], [230, 255]));
  const descBoxG = Math.round(interpolate(descBoxColorT, [0, 1], [31, 255]));
  const descBoxB = Math.round(interpolate(descBoxColorT, [0, 1], [48, 255]));
  const descBoxBg = `rgb(${descBoxR}, ${descBoxG}, ${descBoxB})`;

  // ─── Text clip-path reveals (right → left, RTL) ───
  const nameTextRevealEnter = interpolate(
    frame,
    [NAME_TEXT_START, NAME_TEXT_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_TEXT }
  );
  const nameTextRevealExit = interpolate(
    reverseFrame,
    [NAME_TEXT_START, NAME_TEXT_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_TEXT }
  );
  const nameTextReveal = Math.min(nameTextRevealEnter, nameTextRevealExit);
  // clipPath: reveal from right to left (inset right side shrinks as progress grows)
  const nameClipPath = `inset(0 0 0 ${(1 - nameTextReveal) * 100}%)`;

  const descTextRevealEnter = interpolate(
    frame,
    [DESC_TEXT_START, DESC_TEXT_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_TEXT }
  );
  const descTextRevealExit = interpolate(
    reverseFrame,
    [DESC_TEXT_START, DESC_TEXT_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_TEXT }
  );
  const descTextReveal = Math.min(descTextRevealEnter, descTextRevealExit);
  const descClipPath = `inset(0 0 0 ${(1 - descTextReveal) * 100}%)`;

  // Text opacity mirrors box opacity (already handles both enter & exit)
  const descTextOpacity  = descBoxOpacity;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 940,
          right: 270,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        {/* ── Name box (Shape Layer 5): translateY + fadeIn + color white→red ── */}
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 20px",
            height: 90,
            width: "fit-content",
            fontFamily: nameFontFamily,
            fontSize: 50,
            color: "#fff",
            background: nameBoxBg,
            opacity: nameBoxOpacity,
            transform: `translateY(${nameBoxTranslateY}px)`,
            overflow: "hidden",
          }}
        >
          <span style={{ clipPath: nameClipPath }}>
            {name}
          </span>
        </span>

        {/* ── Description box (Shape Layer 6): translateY + fadeIn + color red→white ── */}
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 20px",
            height: 90,
            width: "fit-content",
            fontFamily: descriptionFontFamily,
            fontSize: 30,
            color: "#000",
            background: descBoxBg,
            opacity: descBoxOpacity,
            transform: `translateY(${descBoxTranslateY}px)`,
            overflow: "hidden",
          }}
        >
          <span style={{ clipPath: descClipPath, opacity: descTextOpacity }}>
            {description}
          </span>
        </span>
      </div>
    </AbsoluteFill>
  );
}
