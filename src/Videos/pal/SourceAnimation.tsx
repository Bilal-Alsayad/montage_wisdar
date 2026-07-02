import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { fitText } from "@remotion/layout-utils";

export const SOURCE_ANIMATION_DURATION = 196;

// Easing curves
const EASE_OUT = Easing.out(Easing.cubic);
const EASE_IN = Easing.in(Easing.cubic);

// Layout constants
const SOURCE_WIDTH = 258;
const SOURCE_HEIGHT = 48;
const SOURCE_ICON_WIDTH = 50;
const SOURCE_TEXT_WIDTH = 170;

// Fit-text constants
const MAX_FONT_SIZE = 38;
const MIN_FONT_SIZE = 22;

interface SourceAnimationProps {
  text?: string;
  fontFamily?: string;
}

export default function SourceAnimation({
  text,
  fontFamily,
}: SourceAnimationProps) {
  const frame = useCurrentFrame();

  if (!text) return null;

  // Fit font size to the available text width, clamped between MIN and MAX
  let fontSize = MAX_FONT_SIZE;
  if (fontFamily) {
    const { fontSize: fitted } = fitText({
      text,
      withinWidth: SOURCE_TEXT_WIDTH,
      fontFamily,
    });
    fontSize = Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, fitted));
  }

  // Red bar
  const redWidth = interpolate(frame, [0, 24], [0, 258], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  const redExitScale = interpolate(frame, [179, 189], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_IN,
  });

  // White bar
  const whiteWidth =
    frame < 172
      ? interpolate(frame, [9, 17], [0, 258], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: EASE_OUT,
        })
      : interpolate(frame, [172, 181], [258, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: EASE_IN,
        });

  // Icon
  const iconInOpacity = interpolate(frame, [7, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  const iconOutOpacity = interpolate(frame, [170, 178], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_IN,
  });
  const iconOpacity = Math.min(iconInOpacity, iconOutOpacity);

  const iconTranslateX =
    frame < 172
      ? interpolate(frame, [7, 15], [-50, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: EASE_OUT,
        })
      : interpolate(frame, [170, 178], [0, -50], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: EASE_IN,
        });

  // Text reveal
  const textIn = interpolate(frame, [14, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  const textOut = interpolate(frame, [168, 176], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_IN,
  });
  const textProgress = Math.min(textIn, textOut);

  return (
    <div
      style={{
        position: "absolute",
        left: 770,
        top: 283,
        width: SOURCE_WIDTH,
        height: SOURCE_HEIGHT,
        pointerEvents: "none",
      }}
    >
      {/* Red background bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: redWidth,
          height: SOURCE_HEIGHT,
          background:
            "linear-gradient(90deg, rgba(178, 54, 54, 1) 0%, rgba(255, 0, 0, 1) 50%)",
          transform: `scaleX(${redExitScale})`,
          transformOrigin: "center center",
          overflow: "hidden",
          zIndex: 0,
        }}
      />

      {/* White bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: whiteWidth,
          height: SOURCE_HEIGHT,
          overflow: "hidden",
          backgroundColor: "#f7f7f7",
          zIndex: 1,
        }}
      />

      {/* Red icon background */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: Math.min(redWidth, SOURCE_ICON_WIDTH),
          height: SOURCE_HEIGHT,
          background:
            "linear-gradient(90deg, rgba(178, 54, 54, 1) 0%, rgba(255, 0, 0, 1) 50%)",
          transform: `scaleX(${redExitScale})`,
          transformOrigin: "center center",
          overflow: "hidden",
          zIndex: 2,
        }}
      />

      {/* Icon */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: SOURCE_ICON_WIDTH,
          height: SOURCE_HEIGHT,
          overflow: "hidden",
          zIndex: 3,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: SOURCE_ICON_WIDTH,
            height: SOURCE_HEIGHT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: iconOpacity,
            transform: `translateX(${iconTranslateX}px)`,
            willChange: "transform, opacity",
          }}
        >
          <Img
            src={staticFile("pal/icons/source.png")}
            style={{
              width: 40,
              height: 40,
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />
        </div>
      </div>

      {/* Text */}
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 0,
          width: SOURCE_TEXT_WIDTH,
          height: SOURCE_HEIGHT,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          clipPath: `inset(0 ${100 - textProgress * 100}% 0 0)`,
          opacity: textProgress,
          zIndex: 4,
          color: "#111111",
          fontFamily,
          fontSize,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </div>
    </div>
  );
}