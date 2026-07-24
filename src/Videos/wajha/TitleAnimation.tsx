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

  const fadeOutProgress = interpolate(frame, [141, 164], [0, 1], clamp);

  const sourceFrame = frame - 10;

  const sourceTranslateY = interpolate(sourceFrame, [0, 20], [70, 0], {
    ...clamp,
    easing: Easing.bezier(0.33, 0, 0.2, 1),
  });

  const sourceOpacity = interpolate(
    sourceFrame,
    [0, 12],
    [0, 1],
    clamp,
  );

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

  const secondBoxOpacity = interpolate(
    secondFrame,
    [0, 12],
    [0, 1],
    clamp,
  );

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
              top: 1120,
              left:280,
              padding: " 5px",
              display: "inline-flex",
              lineHeight:1,
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

        <div
          style={{
            position: "absolute",
            top: 1180,
            left: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            transform: "translateX(-50%)",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 118,
              padding: "0 48px",
              transform: `translateY(${firstTranslateY}px)`,
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
              {text1.split(/\s+/).map((word, wordIndex) => (
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
                  {wordIndex < text1.split(/\s+/).length - 1
                    ? "\u00A0"
                    : ""}
                </span>
              ))}
            </div>
          </div>

          {text2 && (
            <div
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 118,
                padding: "0 48px",
                transform: `translateY(${secondTranslateY}px)`,
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
                  lineHeight: 1,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {text2.split(/\s+/).map((word, wordIndex) => (
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
                    {wordIndex < text2.split(/\s+/).length - 1
                      ? "\u00A0"
                      : ""}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
}