import { useState, useEffect, useMemo } from "react";
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

/** Style overrides for a single speaker */
interface SpeakerStyle {
  color?: string;
  backgroundColor?: string;
}

interface CaptionsProps {
  src: string;
  containerStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  /** Enable word-by-word fadeIn + blur animation across the caption's SRT duration. */
  wordByWord?: boolean;
  /** Maps speaker IDs (e.g. "S1") to arrays of 1-based SRT sentence indices */
  subtitleSpeakers?: Record<string, number[]>;
  /** Maps speaker IDs to colour / background overrides */
  speakerStyles?: Record<string, SpeakerStyle>;
}

const EASE = Easing.bezier(0.333, 0, 0.667, 1);

export default function Captions({
  src,
  containerStyle,
  textStyle,
  wordByWord,
  subtitleSpeakers,
  speakerStyles,
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

  // Build a reverse lookup: 1-based SRT index → speaker ID
  // e.g. { 1: "S1", 2: "S1", 7: "S2", ... }
  const indexToSpeaker = useMemo(() => {
    if (!subtitleSpeakers) return null;
    const map: Record<number, string> = {};
    for (const [speakerId, indices] of Object.entries(subtitleSpeakers)) {
      for (const idx of indices) {
        map[idx] = speakerId;
      }
    }
    return map;
  }, [subtitleSpeakers]);

  if (!captions) {
    return null;
  }

  const currentTimeMs = (frame / fps) * 1000;

  // Find the current caption AND its 1-based index
  let currentCaptionIndex = -1;
  const currentCaption = captions.find((caption, i) => {
    if (currentTimeMs >= caption.startMs && currentTimeMs < caption.endMs) {
      currentCaptionIndex = i;
      return true;
    }
    return false;
  });

  if (!currentCaption || !currentCaption.text.trim() || currentCaption.text.trim() === ".") {
    return null;
  }

  // Resolve speaker style for the current caption (indices are 1-based)
  const srtIndex = currentCaptionIndex + 1; // convert 0-based array index to 1-based SRT index
  const speakerId = indexToSpeaker?.[srtIndex];
  const currentSpeakerStyle: SpeakerStyle | undefined =
    speakerId && speakerStyles ? speakerStyles[speakerId] : undefined;

  // Merge speaker overrides into the text and container styles
  const mergedTextStyle: React.CSSProperties = {
    ...textStyle,
    ...(currentSpeakerStyle?.color ? { color: currentSpeakerStyle.color } : {}),
  };
  const mergedContainerStyle: React.CSSProperties = {
    ...containerStyle,
    ...(currentSpeakerStyle?.backgroundColor
      ? { backgroundColor: currentSpeakerStyle.backgroundColor }
      : {}),
  };

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
          ...mergedContainerStyle,
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
                    ...mergedTextStyle,
                    opacity,
                    filter: blur > 0.01 ? `blur(${blur}px)` : undefined,
                  }}
                >
                  {word}
                  {i < words.length - 1 ? " " : ""}
                </span>
              );
            })
          : <span style={mergedTextStyle}>{currentCaption.text}</span>
        }
      </div>
    </AbsoluteFill>
  );
}
