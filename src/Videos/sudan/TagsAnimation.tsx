import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Img,
  interpolate,
  interpolateColors,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

// ─── Accent color used during animation entrance ──────────────────────────────
const ACCENT = "#D2F474";
const WHITE = "#FFFFFF";

/** Parse date string in YYYY-MM-DD, YYYY.MM.DD, or YYYY/MM/DD format.
 *  Returns [day, month, year] so RTL display shows day rightmost. */
function parseDateParts(date: string): string[] {
  const parts = date.split(/[-.\/]/);
  if (parts.length === 3) {
    // Input is year-month-day → display order: day, month, year (RTL rightmost first)
    return [parts[2], parts[1], parts[0]];
  }
  // Fallback: space-separated
  return date.split(" ");
}

interface TagsAnimationProps {
  date?: string;
  location?: string;
  fontFamily: string;
}

// ─── Full Durations (Lottie op converted to 30fps) ────────────────────────────
// Date:     op=121 @24fps  × 1.25 = 151
// Location: op=27  @25fps  × 1.2  = 32
export const TAGS_ANIMATION_DURATION = 151;

// ─── Date Animation Easings (Lottie fr=24 → 30fps, ×1.25) ───────────────────
const DATE_TEXT_EASE = Easing.bezier(0, 0, 0, 1); // text position: o:(0,0) i:(0,1)
const DATE_ICON_EASE = Easing.bezier(0.333, 0, 0, 1); // icon slide: o:(0.333,0) i:(0,1)
const DATE_PART_EASE = Easing.bezier(0.333, 0, 0.667, 1); // icon parts

// ─── Date Text: word-by-word (Lottie b:3 word animator, s: 0→100 @frames 0→12)
// At 30fps: 12 × 1.25 = 15 frames total. ~5 frames stagger per word.
const DATE_WORD_STAGGER = 5; // frames between each word appearing

// ─── Date Icon: part animation timing @30fps ──────────────────────────────────
const DATE_ICON_ENTER_DURATION = 17; // full icon slide-in duration
// Pins + Header slide down together (translateY)
const DATE_HEADER_PINS_END = 10; // frames to fully settle
// Fold enters diagonally (translateX + translateY)
const DATE_FOLD_START = 6;
const DATE_FOLD_END = 14;

// ─── Location Animation Easings (Lottie fr=25 → 30fps, ×1.2) ────────────────
const LOC_TEXT_EASE = Easing.bezier(0.333, 0, 0.089, 1); // text: o:(0.333,0) i:(0.089,1)
const LOC_ICON_EASE = Easing.bezier(0.333, 0, 0.667, 1); // icon: o:(0.333,0) i:(0.667,1)

// ─── Location Enter Timing ────────────────────────────────────────────────────
const LOC_ENTER_DURATION = 17; // 14 Lottie frames × 1.2
const LOC_ICON_START = 4; // 3 Lottie frames × 1.2
const LOC_ICON_OPACITY_END = 12; // 10 Lottie frames × 1.2

export default function TagsAnimation({
  date,
  location,
  fontFamily,
}: TagsAnimationProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // DATE ANIMATIONS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ── Date Icon: Overall slide-in (translateX) ──────────────────────────────────
  const dateIconEnterX = interpolate(
    frame,
    [0, DATE_ICON_ENTER_DURATION],
    [12, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: DATE_ICON_EASE,
    },
  );

  // ── Pins + Header: translateY together (slide down into position) ─────────────
  const dateHeaderPinsEnterY = interpolate(
    frame,
    [0, DATE_HEADER_PINS_END],
    [-30, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: DATE_PART_EASE,
    },
  );
  const dateHeaderPinsEnterOpacity = interpolate(
    frame,
    [0, DATE_HEADER_PINS_END],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: DATE_PART_EASE,
    },
  );

  // ── Fold: translate on both axes simultaneously (enters from bottom-right corner)
  const dateFoldEnterX = interpolate(
    frame,
    [DATE_FOLD_START, DATE_FOLD_END],
    [30, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: DATE_PART_EASE,
    },
  );
  const dateFoldEnterY = interpolate(
    frame,
    [DATE_FOLD_START, DATE_FOLD_END],
    [30, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: DATE_PART_EASE,
    },
  );

  // ── Date Text: parse YYYY[-./]MM[-./]DD into [day, month, year] ──────────────
  const dateWords = date ? parseDateParts(date) : [];
  const wordCount = dateWords.length;

  // ── Date: Exit (reverse-frame technique) ─────────────────────────────────────
  const dateExitStart = durationInFrames - DATE_ICON_ENTER_DURATION;
  const dateReverseFrame = Math.max(
    0,
    Math.min(
      DATE_ICON_ENTER_DURATION,
      DATE_ICON_ENTER_DURATION - (frame - dateExitStart),
    ),
  );

  const dateIconExitX = interpolate(
    dateReverseFrame,
    [0, DATE_ICON_ENTER_DURATION],
    [12, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: DATE_ICON_EASE,
    },
  );
  const dateExitHeaderPinsY = interpolate(
    dateReverseFrame,
    [0, DATE_HEADER_PINS_END],
    [-10, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: DATE_PART_EASE,
    },
  );
  const dateExitHeaderPinsOpacity = interpolate(
    dateReverseFrame,
    [0, DATE_HEADER_PINS_END],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: DATE_PART_EASE,
    },
  );

  const dateExitFoldX = interpolate(
    dateReverseFrame,
    [DATE_FOLD_START, DATE_FOLD_END],
    [8, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: DATE_PART_EASE,
    },
  );
  const dateExitFoldY = interpolate(
    dateReverseFrame,
    [DATE_FOLD_START, DATE_FOLD_END],
    [8, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: DATE_PART_EASE,
    },
  );

  // ── Date Icon: Color interpolation for moving parts (D2F474 → white) ──────────
  // Header+Pins: color tracks translateY progress (−30→0 maps to accent→white)
  const headerPinsEnterColor = interpolateColors(
    frame,
    [0, DATE_HEADER_PINS_END],
    [ACCENT, WHITE],
  );
  const headerPinsExitColor = interpolateColors(
    dateReverseFrame,
    [0, DATE_HEADER_PINS_END],
    [ACCENT, WHITE],
  );
  // Fold: color tracks translate progress (30→0 maps to accent→white)
  const foldEnterColor = interpolateColors(
    frame,
    [DATE_FOLD_START, DATE_FOLD_END],
    [ACCENT, WHITE],
  );
  const foldExitColor = interpolateColors(
    dateReverseFrame,
    [DATE_FOLD_START, DATE_FOLD_END],
    [ACCENT, WHITE],
  );

  // ── Date: Combine enter + exit ────────────────────────────────────────────────
  const isDateExiting = frame >= dateExitStart;
  const dateIconX = isDateExiting ? dateIconExitX : dateIconEnterX;
  const finalHeaderPinsY = isDateExiting
    ? dateExitHeaderPinsY
    : dateHeaderPinsEnterY;
  const finalIconOpacity = Math.min(
    dateHeaderPinsEnterOpacity,
    dateExitHeaderPinsOpacity,
  );
  const finalHeaderPinsColor = isDateExiting
    ? headerPinsExitColor
    : headerPinsEnterColor;
  const finalFoldX = isDateExiting ? dateExitFoldX : dateFoldEnterX;
  const finalFoldY = isDateExiting ? dateExitFoldY : dateFoldEnterY;
  const finalFoldColor = isDateExiting ? foldExitColor : foldEnterColor;

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // LOCATION ANIMATIONS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ── Location: Enter ───────────────────────────────────────────────────────────
  const locEnterTextX = interpolate(frame, [0, LOC_ENTER_DURATION], [27, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: LOC_TEXT_EASE,
  });
  const locEnterIconOpacity = interpolate(
    frame,
    [LOC_ICON_START, LOC_ICON_OPACITY_END],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: LOC_ICON_EASE,
    },
  );
  const locEnterIconRotation = interpolate(
    frame,
    [LOC_ICON_START, LOC_ENTER_DURATION],
    [20, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: LOC_ICON_EASE,
    },
  );
  const locEnterOpacity = interpolate(frame, [0, LOC_ICON_START], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Location: Exit — exact reverse of enter (reverse-frame technique) ─────────
  const locExitStart = durationInFrames - LOC_ENTER_DURATION;
  const locReverseFrame = Math.max(
    0,
    Math.min(LOC_ENTER_DURATION, LOC_ENTER_DURATION - (frame - locExitStart)),
  );
  const locExitTextX = interpolate(
    locReverseFrame,
    [0, LOC_ENTER_DURATION],
    [27, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: LOC_TEXT_EASE,
    },
  );
  const locExitIconOpacity = interpolate(
    locReverseFrame,
    [LOC_ICON_START, LOC_ICON_OPACITY_END],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: LOC_ICON_EASE,
    },
  );
  const locExitIconRotation = interpolate(
    locReverseFrame,
    [LOC_ICON_START, LOC_ENTER_DURATION],
    [20, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: LOC_ICON_EASE,
    },
  );
  const locExitOpacity = interpolate(
    locReverseFrame,
    [0, LOC_ICON_START],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // ── Location: Combine enter + exit ────────────────────────────────────────────
  const isLocExiting = frame >= locExitStart;
  const locTextX = isLocExiting ? locExitTextX : locEnterTextX;
  const locIconOpacity = Math.min(locEnterIconOpacity, locExitIconOpacity);
  const locIconRotation = isLocExiting
    ? locExitIconRotation
    : locEnterIconRotation;
  const locOpacity = Math.min(locEnterOpacity, locExitOpacity);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RENDER
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  return (
    <AbsoluteFill>
      {(date || location) && (
        <Audio src={staticFile("sudan/sounds/date.wav")} />
      )}
      <div
        style={{
          position: "absolute",
          top: 180,
          right: 50,
          fontFamily,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          direction: "rtl",
          gap: 12,
        }}
      >
        {/* ── Date Row ── */}
        {date && (
          <div
            style={{
              fontSize: 41,
              color: "#FFFFFF",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 14,
            }}
          >
            {/* Calendar Icon — each part animates independently */}
            <div style={{ transform: `translateX(${dateIconX}px)` }}>
              <svg
                viewBox="48 58 416 416"
                width="39"
                height="39"
                overflow="visible"
              >
                {/* Pins + Header: slide down together via translateY */}
                <g
                  id="calendar-header-and-pins"
                  style={{
                    opacity: finalIconOpacity,
                    transform: `translateY(${finalHeaderPinsY}px)`,
                  }}
                >
                  {/* Header bar — color: D2F474 → white as it slides down */}
                  <path
                    fill={finalHeaderPinsColor}
                    d="M 80 96 H 432 A 32 32 0 0 1 464 128 V 176 H 48 V 128 A 32 32 0 0 1 80 96 Z"
                  />
                  {/* Holes (punch-outs in header) */}
                  <g id="holes" fill="#000000">
                    <g id="hole-left">
                      <rect x="144" y="101" width="32" height="48" rx="16" />
                      <rect x="144" y="96" width="32" height="30" />
                    </g>
                    <g id="hole-right">
                      <rect x="336" y="101" width="32" height="48" rx="16" />
                      <rect x="336" y="96" width="32" height="30" />
                    </g>
                  </g>
                  {/* Pins on top — same color as header */}
                  <g id="pin-left" fill={finalHeaderPinsColor}>
                    <rect x="144" y="68" width="32" height="34" rx="16" />
                    <rect x="144" y="86" width="32" height="10" />
                  </g>
                  <g id="pin-right" fill={finalHeaderPinsColor}>
                    <rect x="336" y="68" width="32" height="34" rx="16" />
                    <rect x="336" y="86" width="32" height="10" />
                  </g>
                </g>

                {/* Body: fades in after header settles */}
                <g id="calendar-body" style={{ opacity: finalIconOpacity }}>
                  <path
                    fill="#FFFFFF"
                    d="M 48 208 H 464 V 352 H 384 A 32 32 0 0 0 352 384 V 464 H 80 A 32 32 0 0 1 48 432 Z"
                  />
                </g>

                {/* Fold: translate diagonally, color D2F474 → white as it arrives */}
                <g
                  id="calendar-fold"
                  style={{
                    opacity: finalIconOpacity,
                    transform: `translate(${finalFoldX}px, ${finalFoldY}px)`,
                  }}
                >
                  <path
                    fill={finalFoldColor}
                    d="M 384 376 H 464 L 376 464 V 384 A 8 8 0 0 1 384 376 Z"
                  />
                </g>
              </svg>
            </div>

            {/* Date Text: word-by-word reveal (day → month → year) */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 8,
                direction: "rtl",
              }}
            >
              {dateWords.map((word, index) => {
                // Each word has its own staggered timing (day=0, month=1, year=2)
                const wordStart = index * DATE_WORD_STAGGER;
                const wordEnd = wordStart + DATE_WORD_STAGGER;

                // ── Enter: fade in + slide + color D2F474 → white ────────────────
                const wordEnterOpacity = interpolate(
                  frame,
                  [wordStart, wordEnd],
                  [0, 1],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: DATE_TEXT_EASE,
                  },
                );
                const wordEnterX = interpolate(
                  frame,
                  [wordStart, wordEnd],
                  [10, 0],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: DATE_TEXT_EASE,
                  },
                );
                const wordEnterColor = interpolateColors(
                  frame,
                  [wordStart, wordEnd],
                  [ACCENT, WHITE],
                );

                // ── Exit: reverse stagger + color white → D2F474 ─────────────────
                const exitWordStart =
                  dateExitStart + (wordCount - 1 - index) * DATE_WORD_STAGGER;
                const exitWordEnd = exitWordStart + DATE_WORD_STAGGER;
                const wordExitOpacity = interpolate(
                  frame,
                  [exitWordStart, exitWordEnd],
                  [1, 0],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: DATE_TEXT_EASE,
                  },
                );
                const wordExitX = interpolate(
                  frame,
                  [exitWordStart, exitWordEnd],
                  [0, 10],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: DATE_TEXT_EASE,
                  },
                );
                const wordExitColor = interpolateColors(
                  frame,
                  [exitWordStart, exitWordEnd],
                  [WHITE, ACCENT],
                );

                const wordOpacity = isDateExiting
                  ? wordExitOpacity
                  : wordEnterOpacity;
                const wordX = isDateExiting ? wordExitX : wordEnterX;
                const wordColor = isDateExiting
                  ? wordExitColor
                  : wordEnterColor;

                return (
                  <span
                    key={index}
                    style={{
                      opacity: wordOpacity,
                      transform: `translateX(${wordX}px)`,
                      color: wordColor,
                      display: "inline-block",
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Location Row ── */}
        {location && (
          <div
            style={{
              fontSize: 41,
              color: "#FFFFFF",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 14,
              opacity: locOpacity,
            }}
          >
            {/* Location Icon: fade + rotate in, exact reverse on exit */}
            <div
              style={{
                opacity: locIconOpacity,
                transform: `rotate(${locIconRotation}deg)`,
                transformOrigin: "center bottom",
              }}
            >
              <Img src={staticFile("sudan/icons/location.png")} />
            </div>

            {/* Location Text */}
            <span style={{ transform: `translateX(${locTextX}px)` }}>
              {location}
            </span>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
}
