import { useRef, useState, useEffect } from "react";
import {
  interpolate,
  useCurrentFrame,
  Easing,
  Img,
  delayRender,
  continueRender,
} from "remotion";

interface TagProps {
  text: string;
  iconSrc?: string;
  startFrame?: number;
  x?: number;
  y?: number;
  fontFamily?: string;
  fontSize?: number;
  pauseDuration?: number; // Duration to stay visible (in frames)
  iconWidth?: number;
  iconHeight?: number;
  backgroundColor: string;
  textColor: string;
  alignItemsText?: "start" | "center" | "end";
}

// Animation durations (frames)
const CIRCLE_SCALE_DURATION = 24;
const RECT_EXPAND_DURATION = 60;
const ICON_FADE_DURATION = 20;

/**
 * Tag Component
 * Animated tag with:
 * - In animation: circle scales up, rectangle expands, icon fades in
 * - Pause: stays visible for specified duration
 * - Out animation: reverse of in animation
 */
export default function Tag({
  text,
  iconSrc,
  startFrame = 0,
  x = 540,
  y = 960,
  fontFamily = "'IBM Plex Sans Arabic SemiBold', Arial, sans-serif",
  fontSize = 30,
  pauseDuration = 180, // 3 seconds at 60fps
  iconWidth = 28,
  iconHeight = 33,
  backgroundColor,
  textColor,
  alignItemsText = "center",
}: TagProps) {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  // Measure text width
  const textRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(0);
  const [handle] = useState(() => delayRender("Measuring Tag text"));

  useEffect(() => {
    const measure = () => {
      if (textRef.current && textRef.current.offsetWidth > 0) {
        setTextWidth(textRef.current.offsetWidth);
        continueRender(handle);
      } else {
        setTimeout(measure, 50);
      }
    };
    measure();
  }, [handle]);

  // Calculate phase timings (circle first, then rectangle)
  const inDuration = CIRCLE_SCALE_DURATION + RECT_EXPAND_DURATION;
  const pauseStart = inDuration;
  const outStart = pauseStart + pauseDuration;
  const totalDuration = outStart + inDuration;

  // Determine current phase
  const isInPhase = localFrame >= 0 && localFrame < pauseStart;
  const isPausePhase = localFrame >= pauseStart && localFrame < outStart;
  const isOutPhase = localFrame >= outStart && localFrame < totalDuration;
  const isEnded = localFrame >= totalDuration;

  // Animation progress for in/out phases
  const getAnimationProgress = () => {
    if (isInPhase) {
      return localFrame; // Forward progress
    } else if (isPausePhase) {
      return inDuration; // Hold at max
    } else if (isOutPhase) {
      // Reverse: map outStart->totalDuration to inDuration->0
      return inDuration - (localFrame - outStart);
    }
    return 0;
  };

  const animProgress = getAnimationProgress();

  // Circle scale (0 to 1)
  const circleScale = interpolate(
    animProgress,
    [0, CIRCLE_SCALE_DURATION],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.5)),
    },
  );

  // Rectangle width animation (0 to full width)
  const paddingRight = 40;
  const paddingLeft = 15;
  const fullRectWidth = textWidth + paddingRight + paddingLeft;

  const rectWidth = interpolate(
    animProgress,
    [CIRCLE_SCALE_DURATION, CIRCLE_SCALE_DURATION + RECT_EXPAND_DURATION],
    [0, fullRectWidth],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );

  // Icon opacity (fade in after circle is visible)
  const iconOpacity = interpolate(
    animProgress,
    [CIRCLE_SCALE_DURATION - 5, CIRCLE_SCALE_DURATION - 5 + ICON_FADE_DURATION],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const circleSize = 45;
  const rectHeight = 37;

  // Hidden text measurer - always rendered so delayRender can be resolved
  const hiddenMeasurer = (
    <span
      ref={textRef}
      style={{
        position: "absolute",
        visibility: "hidden",
        fontFamily,
        fontSize,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );

  // Don't render before start or after end
  if (localFrame < 0 || isEnded) return <>{hiddenMeasurer}</>;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
      }}
    >
      {hiddenMeasurer}

      {/* Yellow Rectangle container - clips the text */}
      <div
        style={{
          position: "absolute",
          right: circleSize / 2 - 10,
          top: (circleSize - rectHeight) / 2,
          width: rectWidth,
          height: rectHeight,
          backgroundColor: backgroundColor,
          borderRadius: rectHeight / 2,
          overflow: "hidden",
        }}
      >
        {/* Text positioned from left */}
        <div
          style={{
            height: rectHeight,
            display: "flex",
            alignItems: alignItemsText,
            marginLeft: 15,
          }}
        >
          <span
            style={{
              fontFamily,
              fontSize,
              color: textColor,
              whiteSpace: "nowrap",
            }}
          >
            {text}
          </span>
        </div>
      </div>

      {/* White Circle with Icon - fixed position */}
      <div
        style={{
          position: "relative",
          width: circleSize,
          height: circleSize,
          borderRadius: "50%",
          backgroundColor: "#FFFFFF",
          transform: `scale(${circleScale})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          zIndex: 2,
        }}
      >
        {iconSrc && (
          <Img
            src={iconSrc}
            style={{
              width: iconWidth,
              height: iconHeight,
              opacity: iconOpacity,
            }}
          />
        )}
        {!iconSrc && (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style={{ opacity: iconOpacity }}
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
              fill="#0E2B39"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

// Export total duration for use in parent components
export const getTagTotalDuration = (pauseDuration = 180) => {
  const inDuration = CIRCLE_SCALE_DURATION + RECT_EXPAND_DURATION;
  return inDuration + pauseDuration + inDuration;
};