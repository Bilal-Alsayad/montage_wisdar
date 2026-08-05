import {
  AbsoluteFill,
  Easing,
  interpolate,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { splitTextIntoMultipleLines } from "../../utils/textUtils";

interface TitleAnimationProps {
  text: string;
  fontFamily: string;
}

export const TITLE_ANIMATION_DURATION = 180;

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();
  const rawLines = splitTextIntoMultipleLines(text, 3);

  if (!rawLines || rawLines.length === 0) {
    return null;
  }

  const lines = rawLines.map((line) => line.split(/\s+/));

  return (
    <AbsoluteFill>
      <div
        dir="rtl"
        lang="ar"
        style={{
          position: "absolute",
          bottom: 200,
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            width: "max-content",
            padding: 20,
          }}
        >
          <OffthreadVideo
            src={staticFile("alasimah/elements/title.webm")}
            playbackRate={0.6}
            transparent
            muted
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "fill",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              color: "#404040",
              fontFamily,
              padding: 20,
              fontSize: 70,
              lineHeight: "80px",
              textAlign: "center",
              unicodeBidi: "plaintext",
            }}
          >
            {lines.map((words, lineIndex) => {
              const previousWordsCount = lines
                .slice(0, lineIndex)
                .reduce((acc, l) => acc + l.length, 0);

              return (
                <div
                  key={lineIndex}
                  style={{
                    whiteSpace: "nowrap",
                  }}
                >
                  {words.map((word, wordIndex) => {
                    const totalWordIndex = previousWordsCount + wordIndex;
                    return (
                      <span
                        key={`${lineIndex}-${wordIndex}`}
                        style={{
                          opacity: interpolate(
                            frame,
                            [30 + totalWordIndex * 6, 36 + totalWordIndex * 6],
                            [0, 1],
                            {
                              extrapolateLeft: "clamp",
                              extrapolateRight: "clamp",
                              easing: Easing.bezier(0.333, 0, 0.667, 1),
                            },
                          ),
                        }}
                      >
                        {word}
                        {wordIndex < words.length - 1 && "\u00A0"}
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}
