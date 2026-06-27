import { Easing, interpolate } from "remotion";

// ─── Shared easing ────────────────────────────────────────────────────────────
// Extracted from all Lottie files: o.x=0.333, o.y=0 | i.x=0.667, i.y=1
export const EASE = Easing.bezier(0.333, 0, 0.667, 1);

// ─── Per-character animation helper ──────────────────────────────────────────
// Mirrors the Lottie text animator (b=1 character-based, a.p=[34,0,0] offset).
// The offset selector sweeps from 0→100% staggering each character sequentially.
//
// @param inputFrame  - current frame (pass `frame` for enter, `reverseFrame` for exit)
// @param charIdx     - 0-based index of this character
// @param totalChars  - total character count in the string
// @param sweepStart  - Remotion frame where the sweep begins (first char starts)
// @param sweepEnd    - Remotion frame where the sweep ends (last char finishes)
export function charEnter(
  inputFrame: number,
  charIdx: number,
  totalChars: number,
  sweepStart: number,
  sweepEnd: number
): { opacity: number; translateX: number } {
  const total = totalChars === 0 ? 1 : totalChars;
  const sweepSpan = sweepEnd - sweepStart;
  const charStart = sweepStart + (charIdx / total) * sweepSpan;
  // 30% overlap so adjacent characters animate together smoothly
  const charDur = sweepSpan / total + sweepSpan * 0.3;

  const opacity = interpolate(
    inputFrame,
    [charStart, charStart + charDur],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }
  );

  const translateX = interpolate(
    inputFrame,
    [charStart, charStart + charDur],
    [34, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }
  );

  return { opacity, translateX };
}

// ─── Reverse-frame helper ─────────────────────────────────────────────────────
// Returns a frame that counts backwards from enterDuration→0 once exitStart is reached.
// Feed the result to any enter interpolation to get a perfect mirror exit.
export function reverseFrameOf(
  frame: number,
  enterDuration: number,
  durationInFrames: number
): { reverseFrame: number; isExiting: boolean } {
  const exitStart = durationInFrames - enterDuration;
  const isExiting = frame >= exitStart;
  const reverseFrame = Math.max(
    0,
    Math.min(enterDuration, enterDuration - (frame - exitStart))
  );
  return { reverseFrame, isExiting };
}
