import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

interface TitleAnimationProps {
  text: string;
  fontFamily: string;
}

export const TITLE_ANIMATION_DURATION = 360;

const EASE = Easing.bezier(0.333, 0, 0.667, 1);

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const words = text.split(/\s+/);


  // Box slides in from right: Null 2 position [712→540] at t:0→18
  const boxSlideX = interpolate(frame, [0, 18], [172, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  // Box rotates in: Null 2 rotation 1→0° at t:0→18
  const boxRotate = interpolate(frame, [0, 18], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  // Top border (Linear Wipe)
  const borderReveal = interpolate(frame, [0, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  // Right border (Linear Wipe)
  const borderRightReveal = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  // Words
  const wordStaggerDuration = 20;
  const perWordDuration = 20;

  // Exit
  const exitDuration = 14;
  const exitStart = durationInFrames - exitDuration;

  // Position
  const exitSlideX = interpolate(frame, [exitStart, exitStart + exitDuration], [0, -81], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  // Tint
  const exitBrightness = interpolate(frame, [exitStart + 1, exitStart + 11], [1, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  // Enter opacity: Rectangle 5 opacity 0→100 at t:0→6
  const boxFadeIn = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  // Exit opacity: 100→0 at relative t:7→14
  const exitOpacity = interpolate(frame, [exitStart + 7, exitStart + exitDuration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  const finalOpacity = Math.min(boxFadeIn, exitOpacity);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 1075,
          left: 0,
          right: 0,
          margin: "0 auto",
          height: 350,
          width: 850,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateX(${frame >= exitStart ? exitSlideX : boxSlideX}px) rotate(${frame >= exitStart ? 0 : boxRotate}deg)`,
          transformOrigin: "right center",
          opacity: finalOpacity,
          filter: `brightness(${exitBrightness})`,
          direction: "rtl",
          backgroundColor: "#F6C11DD9",
        }}
      >
        {/* Border (line + triangle as one piece) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 20,
            clipPath: `inset(-20px 0 -20px ${(1 - borderReveal) * 100}%)`,
          }}
        >
          <div
            style={{
              height: "20px",
              backgroundColor: "#FFFFFF",
            }}
          />
          <span
            style={{
              width: 0,
              height: 0,
              position: "absolute",
              top: 19,
              right: 0,
              borderStyle: "solid",
              borderWidth: "21px 0 0 21px",
              borderColor: "#FFFFFF transparent transparent transparent",
            }}
          />
        </div>

        {/* Border right */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            clipPath: `inset(-20px -20px ${(1 - borderRightReveal) * 100}% -20px)`,
          }}
        >
          <div
            style={{
              width: "20px",
              height: "310px",
              backgroundColor: "#FFFFFF",
            }}
          />
        </div>

        {/* Title text — word-by-word fadeIn + blur */}
        <div
          style={{
            fontFamily,
            fontSize: 70,
            textAlign: "center",
            width: "fit-content",
            lineHeight: 1.4,
            direction: "rtl",
            color: "#000000",
          }}
        >
          {words.map((word, i) => {
            const wordStart = (i / words.length) * wordStaggerDuration;

            const wordOpacity = interpolate(
              frame,
              [wordStart, wordStart + perWordDuration],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE,
              }
            );

            const wordBlur = interpolate(
              frame,
              [wordStart, wordStart + perWordDuration],
              [40, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE,
              }
            );

            return (
              <span
                key={i}
                style={{
                  opacity: wordOpacity,
                  filter: wordBlur > 0.1 ? `blur(${wordBlur}px)` : undefined,
                }}
              >
                {word}
                {i < words.length - 1 ? " " : ""}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}
