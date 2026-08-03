/* eslint-disable @remotion/no-background-image */

import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { splitTitle } from "../../utils/textUtils";

interface TitleAnimationProps {
  text: string;
  source: string;
  fontFamily: string;
}

export const TITLE_ANIMATION_DURATION = 165;

const FIRST_TITLE_TOP = 1180;
const SECOND_TITLE_TOP = 1284;

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

export default function TitleAnimation({
  text,
  source,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();
  const { text1, text2 } = splitTitle(text);

  if (!text1) {
    return null;
  }

  const firstWords = text1.split(/\s+/);
  const secondWords = text2.split(/\s+/);

  const fadeOutProgress = interpolate(frame, [141, 164], [0, 1], clamp);

  const sourceFrame = frame - 10;

  const sourceTranslateY = interpolate(sourceFrame, [0, 20], [70, 0], {
    ...clamp,
    easing: Easing.bezier(0.33, 0, 0.2, 1),
  });

  const sourceOpacity = interpolate(sourceFrame, [0, 12], [0, 1], clamp);

  const firstTranslateY = interpolate(frame, [0, 16], [80, 0], {
    ...clamp,
    easing: Easing.bezier(0.33, 0, 0.2, 1),
  });

  const firstScaleX = interpolate(frame, [0, 16], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.33, 0, 0.2, 1),
  });

  const firstBoxOpacity = interpolate(frame, [0, 8], [0, 1], clamp);

  const secondFrame = frame - 5;

  const secondTranslateY = interpolate(secondFrame, [0, 24], [80, 0], {
    ...clamp,
    easing: Easing.bezier(0.33, 0, 0.2, 1),
  });

  const secondScaleX = interpolate(secondFrame, [0, 24], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.33, 0, 0.2, 1),
  });

  const secondBoxOpacity = interpolate(secondFrame, [0, 12], [0, 1], clamp);

  return (
    <AbsoluteFill dir="rtl">
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 1 - fadeOutProgress,
          transform: `translateY(${fadeOutProgress * 100}px)`,
          filter: `brightness(${1 - fadeOutProgress}) invert(${fadeOutProgress})`,
        }}
      >
        {source && (
          <div
            style={{
              position: "absolute",
              top: 1123,
              left: 280,
              padding: " 5px",
              display: "inline-flex",
              lineHeight: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#b8ff02",
              color: "#000",
              fontFamily,
              fontSize: 50,
              textAlign: "center",
              whiteSpace: "nowrap",
              opacity: sourceOpacity,
              transform: `translate(-50%, ${sourceTranslateY}px)`,
            }}
          >
            {source}
          </div>
        )}

        {text2 && (
          <div
            style={{
              position: "absolute",
              top: SECOND_TITLE_TOP,
              left: "50%",
              zIndex: 1,
              transform: `translate(-50%, ${secondTranslateY}px)`,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 118,
              padding: "0 48px",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url("${staticFile(
                  "wajha/images/title2.png",
                )}")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "100% 100%",
                transform: `scaleX(${secondScaleX})`,
                transformOrigin: "center",
                opacity: secondBoxOpacity,
              }}
            />

            <div
              style={{
                position: "relative",
                color: "#fff",
                fontFamily,
                fontSize: 78,
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              {secondWords.map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  style={{
                    display: "inline-block",
                    opacity: interpolate(
                      secondFrame,
                      [8.4 + wordIndex * 4, 16.4 + wordIndex * 4],
                      [0, 1],
                      clamp,
                    ),
                  }}
                >
                  {word}
                  {wordIndex < secondWords.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </div>
          </div>
        )}

        <div
          style={{
            position: "absolute",
            top: FIRST_TITLE_TOP,
            left: "50%",
            zIndex: 2,
            transform: `translate(-50%, ${firstTranslateY}px)`,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 118,
            padding: "0 48px",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url("${staticFile(
                "wajha/images/title1.png",
              )}")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "100% 100%",
              transform: `scaleX(${firstScaleX})`,
              transformOrigin: "center",
              opacity: firstBoxOpacity,
              filter: "drop-shadow(0 10px 6px rgba(0, 0, 0, 0.45))",
            }}
          />

          <div
            style={{
              position: "relative",
              color: "#000",
              fontFamily,
              fontSize: 78,
              lineHeight: 1,
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            {firstWords.map((word, wordIndex) => (
              <span
                key={wordIndex}
                style={{
                  display: "inline-block",
                  opacity: interpolate(
                    frame,
                    [5.6 + wordIndex * 3, 13.6 + wordIndex * 3],
                    [0, 1],
                    clamp,
                  ),
                }}
              >
                {word}
                {wordIndex < firstWords.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}
