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
const EASE_OUT = Easing.bezier(0.333, 0, 0.833, 1);

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const words = text.split(/\s+/);

  // --- Border (red line + triangle) ---
  const borderSlideX = interpolate(frame, [0, 53], [-95, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  const borderReveal = interpolate(frame, [0, 53], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  // --- Title text ---
  const textSlideX = interpolate(frame, [0, 77], [-97, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  const wordStaggerDuration = 50;
  const perWordDuration = 25;

  // --- Exit (all elements together) ---
  const exitDuration = 27;
  const exitStart = durationInFrames - exitDuration;

  const exitSlideY = interpolate(frame, [exitStart, exitStart + exitDuration], [0, 75], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  const exitOpacity = interpolate(
    frame,
    [exitStart + (exitDuration - 15), exitStart + exitDuration],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE,
    }
  );

  const exitBrightness = interpolate(frame, [exitStart - 2, exitStart + 17], [1, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 1250,
          left: 0,
          right: 0,
          margin: "0 auto",
          padding: "20px 10px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          maxWidth: "78%",
          gap: 20,
          transform: `translateY(${exitSlideY}px)`,
          opacity: exitOpacity,
          filter: `brightness(${exitBrightness})`,
          direction: "rtl",
        }}
      >
        {/* Border (line + triangle as one piece) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            transform: `translateX(${borderSlideX}px)`,
            clipPath: `inset(-20px 0 -20px ${(1 - borderReveal) * 100}%)`,
          }}
        >
          <div
            style={{
              height: "10px",
              backgroundColor: "#E62B2B",
            }}
          />
          <span
            style={{
              width: 0,
              height: 0,
              position: "absolute",
              top: 9,
              right: 0,
              borderStyle: "solid",
              borderWidth: "11px 0 0 11px",
              borderColor: "#E62B2B transparent transparent transparent",
            }}
          />
        </div>

        {/* Title text — word-by-word fadeIn + blur */}
        <div
          className="first-line:text-white first-line:[text-shadow:2px_2px_12px_rgba(0,0,0,0.71)] text-[#E62B2B]"
          style={{
            fontFamily,
            fontSize: 70,
            textAlign: "center",
            width: "fit-content",
            lineHeight: 1.4,
            transform: `translateX(${textSlideX}px)`,
            direction: "rtl",
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
