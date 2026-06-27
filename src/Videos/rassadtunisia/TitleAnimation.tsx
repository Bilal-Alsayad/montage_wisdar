import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { splitTitle } from "../../utils/textUtils";

// ─── Lottie data.json analysis (fr: 25fps → Remotion 30fps, multiply × 1.2) ───
//
// Shape Layer 5 (box enter):  opacity 0→100 in frames 5→10  → 6→12 @ 30fps
// Shape Layer 6 (box enter):  opacity 0→100 in frames 7→12  → 8→14 @ 30fps
// Text_1 (text reveal):       sweep 0→100 in frames 7→22    → 8→26 @ 30fps
// Text_2 (text reveal):       sweep 0→100 in frames 9→24    → 11→29 @ 30fps
// Image:                      translateX, same timing as box enter
// Easing: Easing.bezier(o.x, o.y, i.x, i.y)

// ─── Easing curves ───
const EASE_FADE  = Easing.bezier(0.333, 0, 0.667, 1); // opacity (Shape layers)
const EASE_SLIDE = Easing.bezier(0.333, 0, 0.322, 1); // position translateX
const EASE_TEXT  = Easing.bezier(0.333, 0, 0.194, 1); // text clip-path reveal

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
  const { text1, text2 } = splitTitle(text);

  // ─── Timing constants (Lottie frames × 1.2 for 30fps) ───
  // Box 1 (Shape Layer 5 analog)
  const BOX1_FADE_START = 6;   // 5  × 1.2
  const BOX1_FADE_END   = 12;  // 10 × 1.2
  // Box 2 (Shape Layer 6 analog) — staggered 2 frames later
  const BOX2_FADE_START = 8;   // 7  × 1.2
  const BOX2_FADE_END   = 14;  // 12 × 1.2
  // Image (grid.png) translateX from right
  const IMG_SLIDE_START = 0;
  const IMG_SLIDE_END   = 18;  // slightly before boxes for layered feel
  // Text 1 reveal (Text_1 analog)
  const TEXT1_START = 8;       // 7  × 1.2
  const TEXT1_END   = 26;      // 22 × 1.2
  // Text 2 reveal (Text_2 analog)
  const TEXT2_START = 11;      // 9  × 1.2
  const TEXT2_END   = 29;      // 24 × 1.2
  // 4 small squares — staggered 3 frames apart
  const SQ_DUR = 14;
  const SQ1_START = 2;
  const SQ2_START = 5;
  const SQ3_START = 8;
  const SQ4_START = 11;

  // ─── Longest enter span (for exit reverse timing) ───
  const ENTER_DURATION = TEXT2_END;

  // ─── Exit: reverse-frame technique ───
  const exitStart    = durationInFrames - ENTER_DURATION;
  const reverseFrame = Math.max(
    0,
    Math.min(ENTER_DURATION, ENTER_DURATION - (frame - exitStart))
  );
  const isExiting = frame >= exitStart;

  // ─── Box 1 opacity ───
  const box1Enter   = interpolate(frame,        [BOX1_FADE_START, BOX1_FADE_END], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_FADE });
  const box1Exit    = interpolate(reverseFrame, [BOX1_FADE_START, BOX1_FADE_END], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_FADE });
  const box1Opacity = Math.min(box1Enter, box1Exit);

  // ─── Box 2 opacity ───
  const box2Enter   = interpolate(frame,        [BOX2_FADE_START, BOX2_FADE_END], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_FADE });
  const box2Exit    = interpolate(reverseFrame, [BOX2_FADE_START, BOX2_FADE_END], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_FADE });
  const box2Opacity = Math.min(box2Enter, box2Exit);

  // ─── Image (grid.png) translateX from right + fadeIn ───
  const imgSlideEnter  = interpolate(frame,        [IMG_SLIDE_START, IMG_SLIDE_END], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_SLIDE });
  const imgSlideExit   = interpolate(reverseFrame, [IMG_SLIDE_START, IMG_SLIDE_END], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_SLIDE });
  const imgTranslateX  = isExiting ? imgSlideExit : imgSlideEnter;
  const imgFadeEnter   = interpolate(frame,        [IMG_SLIDE_START, IMG_SLIDE_END], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_FADE });
  const imgFadeExit    = interpolate(reverseFrame, [IMG_SLIDE_START, IMG_SLIDE_END], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_FADE });
  const imgOpacity     = Math.min(imgFadeEnter, imgFadeExit);

  // ─── Text 1: clipPath (right→left) + translateX + inherited opacity from box1 ───
  const text1RevealEnter  = interpolate(frame,        [TEXT1_START, TEXT1_END], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_TEXT });
  const text1RevealExit   = interpolate(reverseFrame, [TEXT1_START, TEXT1_END], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_TEXT });
  const text1Reveal       = Math.min(text1RevealEnter, text1RevealExit);
  // inset(top right bottom left): clips from RIGHT → reveals left-to-right
  const text1ClipPath     = `inset(0 ${(1 - text1Reveal) * 100}% 0 0)`;
  const text1SlideEnter   = interpolate(frame,        [TEXT1_START, TEXT1_END], [60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_SLIDE });
  const text1SlideExit    = interpolate(reverseFrame, [TEXT1_START, TEXT1_END], [60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_SLIDE });
  const text1TranslateX   = isExiting ? text1SlideExit : text1SlideEnter;

  // ─── Text 2: clipPath (left→right) + translateX + inherited opacity from box2 ───
  const text2RevealEnter  = interpolate(frame,        [TEXT2_START, TEXT2_END], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_TEXT });
  const text2RevealExit   = interpolate(reverseFrame, [TEXT2_START, TEXT2_END], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_TEXT });
  const text2Reveal       = Math.min(text2RevealEnter, text2RevealExit);
  const text2ClipPath     = `inset(0 ${(1 - text2Reveal) * 100}% 0 0)`;
  const text2SlideEnter   = interpolate(frame,        [TEXT2_START, TEXT2_END], [60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_SLIDE });
  const text2SlideExit    = interpolate(reverseFrame, [TEXT2_START, TEXT2_END], [60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_SLIDE });
  const text2TranslateX   = isExiting ? text2SlideExit : text2SlideEnter;

  // ─── 4 Small squares: staggered fadeIn + translateX, each with its own max opacity ───
  const squareAnim = (start: number, maxOpacity: number) => {
    const end = start + SQ_DUR;
    const opEnter  = interpolate(frame,        [start, end], [0, maxOpacity], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_FADE });
    const opExit   = interpolate(reverseFrame, [start, end], [0, maxOpacity], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_FADE });
    const txEnter  = interpolate(frame,        [start, end], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_SLIDE });
    const txExit   = interpolate(reverseFrame, [start, end], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_SLIDE });
    return {
      opacity:    Math.min(opEnter, opExit),
      translateX: isExiting ? txExit : txEnter,
    };
  };

  const sq1 = squareAnim(SQ1_START, 1.00);  // 100%
  const sq2 = squareAnim(SQ2_START, 0.85);  //  85%
  const sq3 = squareAnim(SQ3_START, 0.53);  //  53%
  const sq4 = squareAnim(SQ4_START, 0.30);  //  30%

  const SQ_SIZE = 18;
  const SQ_GAP  = 10;

  return (
    <AbsoluteFill>
      {/* ── Grid image: translateX from right + fadeIn ── */}
      <Img
        src={staticFile("rassadtunisia/elements/grid.png")}
        style={{
          position: "absolute",
          top: 840,
          right: 15,
          mixBlendMode: "screen",
          opacity: imgOpacity,
          transform: `translateX(${imgTranslateX}px)`,
        }}
      />

      {/* ── Title boxes + text ── */}
      <div
        style={{
          position: "absolute",
          top: 880,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          fontSize: 60,
          fontFamily,
          direction: "rtl",
          color: "#ffffff",
        }}
      >
        {/* Box 1: fadeIn — text: clipPath right→left + translateX */}
        <span
          style={{
            background: "linear-gradient(180deg, #e61f30 11.5%, #b31925 88.5%)",
            padding: "6px 20px",
            opacity: box1Opacity,
            overflow: "hidden",
            display: "block",
          }}
        >
          <span
            style={{
              display: "block",
              clipPath: text1ClipPath,
              transform: `translateX(${text1TranslateX}px)`,
            }}
          >
            {text1}
          </span>
        </span>

        {/* Box 2: fadeIn — text: clipPath right→left + translateX */}
        <span
          style={{
            background: "linear-gradient(180deg, #e61f30 11.5%, #b31925 88.5%)",
            padding: "6px 20px",
            opacity: box2Opacity,
            overflow: "hidden",
            display: "block",
          }}
        >
          <span
            style={{
              display: "block",
              clipPath: text2ClipPath,
              transform: `translateX(${text2TranslateX}px)`,
            }}
          >
            {text2}
          </span>
        </span>
      </div>

      {/* ── 4 Small decorative squares — 2×2 grid on right side of title ── */}
      {/* Column right: sq1 (top-right) + sq3 (bottom-right) */}
      {/* Column left:  sq2 (top-left)  + sq4 (bottom-left)  */}
      <div
        style={{
          position: "absolute",
          top: 1185,
          right: 90,
          display: "flex",
          
          gap: SQ_GAP,
        }}
      >
        <div style={{ width: SQ_SIZE, height: SQ_SIZE, background: "#e61f30", opacity: sq4.opacity, transform: `translateX(${sq4.translateX}px)`, boxShadow: "0 0 24px 3.36px rgba(230, 31, 48, 0.53)" }} />
        <div style={{ width: SQ_SIZE, height: SQ_SIZE, background: "#e61f30", opacity: sq3.opacity, transform: `translateX(${sq3.translateX}px)`, boxShadow: "0 0 24px 3.36px rgba(230, 31, 48, 0.53)" }} />
        <div style={{ width: SQ_SIZE, height: SQ_SIZE, background: "#e61f30", opacity: sq2.opacity, transform: `translateX(${sq2.translateX}px)`, boxShadow: "0 0 24px 3.36px rgba(230, 31, 48, 0.53)" }} />
        <div style={{ width: SQ_SIZE, height: SQ_SIZE, background: "#e61f30", opacity: sq1.opacity, transform: `translateX(${sq1.translateX}px)`, boxShadow: "0 0 24px 3.36px rgba(230, 31, 48, 0.53)" }} />
      </div>
    </AbsoluteFill>
  );
}
