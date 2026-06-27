import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  interpolateColors,
  Easing,
} from "remotion";

// ── ثوابت الألوان والتوقيت ──────────────────────────────────────────────────
const HIGHLIGHT_START = 7;
const HIGHLIGHT_END = 40;
const HIGHLIGHT_DURATION = HIGHLIGHT_END - HIGHLIGHT_START;

const COLOR_START = "rgb(219, 20, 63)"; // أحمر
const COLOR_END = "rgb(255, 255, 255)"; // أبيض

interface TitleAnimationProps {
  text: string;
  fontFamily: string;
}

export const TitleAnimation: React.FC<TitleAnimationProps> = ({
  text,
  fontFamily,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const exitStart = durationInFrames - 11;
  const exitEnd = durationInFrames - 1;
  const fadeOutStart = durationInFrames - 7;

  // ── حركة الدخول والخروج ───────────────────────────────────────────────────
  const opacity = interpolate(
    frame,
    [0, 5, fadeOutStart, exitEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const titleOffsetX = interpolate(frame, [0, 14], [92, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.167, 0, 0.667, 1),
  });

  const exitOffsetY = interpolate(frame, [exitStart, exitEnd], [0, 64], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.333, 0, 0.667, 1),
  });

  // ── الكلمات ───────────────────────────────────────────────────────────────
  const words = text.split(" ").filter((w) => w.length > 0);
  const totalWords = words.length;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 380,
          margin: "0 auto",
          width: "85%",
          direction: "rtl",
          textAlign: "center",
          transform: `translate(${titleOffsetX}px, ${exitOffsetY}px)`,
          opacity,
        }}
      >
        <span
          style={{
            fontFamily,
            fontSize: 60,
            lineHeight: "72px",
            display: "inline",
          }}
        >
          {words.map((word, i) => {
            const wordStart =
              HIGHLIGHT_START +
              (i / Math.max(totalWords, 1)) * HIGHLIGHT_DURATION;
            const wordEnd =
              HIGHLIGHT_START +
              ((i + 1) / Math.max(totalWords, 1)) * HIGHLIGHT_DURATION;
            const transitionDuration = Math.max((wordEnd - wordStart) * 0.6, 3);

            const revealDelay = (i / Math.max(totalWords - 1, 1)) * 14;
            const wordOpacity = interpolate(
              frame,
              [revealDelay, revealDelay + 3],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            );

            const wordColor = interpolateColors(
              frame,
              [wordStart, wordStart + transitionDuration],
              [COLOR_START, COLOR_END],
            );

            return (
              <span key={`${word}-${i}`}>
                <span style={{ opacity: wordOpacity, color: wordColor }}>
                  {word}
                </span>
                {i < totalWords - 1 ? " " : ""}
              </span>
            );
          })}
        </span>
      </div>
    </AbsoluteFill>
  );
};
