import { useState, useEffect } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  delayRender,
  continueRender,
  interpolate,
  Easing,
} from "remotion";
import { parseSrt, type Caption } from "@remotion/captions";

interface CaptionsProps {
  src: string;
  containerStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  /** Enable word-by-word fadeIn + blur animation across the caption's SRT duration. */
  wordByWord?: boolean;
}

const EASE = Easing.bezier(0.333, 0, 0.667, 1);

export default function Captions({
  src,
  containerStyle,
  textStyle,
  wordByWord,
}: CaptionsProps) {
  const [captions, setCaptions] = useState<Caption[] | null>(null);
  const [handle] = useState(() => delayRender("Loading captions"));
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Load and parse SRT file
  useEffect(() => {
    const loadCaptions = async () => {
      try {
        const response = await fetch(src);
        const srtContent = await response.text();

        // Parse SRT file - each entry becomes a Caption
        const { captions: parsedCaptions } = parseSrt({ input: srtContent });

        setCaptions(parsedCaptions);
        continueRender(handle);
      } catch (e) {
        console.error("Failed to load captions:", e);
        continueRender(handle);
      }
    };

    loadCaptions();
  }, [handle]);

  if (!captions) {
    return null;
  }

  const currentTimeMs = (frame / fps) * 1000;

  const currentCaption = captions.find((caption) => {
    return currentTimeMs >= caption.startMs && currentTimeMs < caption.endMs;
  });

  if (!currentCaption || !currentCaption.text.trim() || currentCaption.text.trim() === ".") {
    return null;
  }

  const words = currentCaption.text.trim().split(/\s+/);
  const captionDurationMs = currentCaption.endMs - currentCaption.startMs;
  const elapsed = currentTimeMs - currentCaption.startMs;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          textAlign: "center",
          maxWidth: "80%",
          width: "fit-content",
          direction: textStyle?.direction as React.CSSProperties["direction"],
          unicodeBidi: "plaintext",
          ...containerStyle,
        }}
      >
        {wordByWord
          ? words.map((word, i) => {
              // Animate over 60% of duration, hold for remaining 40%
              const animDuration = captionDurationMs * 0.6;
              const wordStart = (i / words.length) * animDuration;
              const wordDuration = (animDuration / words.length) * 2;
              const wordProgress = Math.min(
                1,
                Math.max(0, (elapsed - wordStart) / wordDuration)
              );

              // Opacity reaches 1 early so the word is visible while still blurry
              const opacity = interpolate(wordProgress, [0, 0.4], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE,
              });

              // Blur clears over the full duration — lingers after word appears
              const blur = interpolate(wordProgress, [0, 1], [12, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE,
              });

              return (
                <span
                  key={i}
                  style={{
                    ...textStyle,
                    opacity,
                    filter: blur > 0.01 ? `blur(${blur}px)` : undefined,
                  }}
                >
                  {word}
                  {i < words.length - 1 ? " " : ""}
                </span>
              );
            })
          : <span style={textStyle}>{currentCaption.text}</span>
        }
      </div>
    </AbsoluteFill>
  );
}
