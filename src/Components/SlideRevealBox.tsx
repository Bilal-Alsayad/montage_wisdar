import React from "react";
import {
  Img,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";

export interface SlideRevealBoxProps {
  text: string;
  fontFamily: string;
  boxColor: string;
  textColor: string;
  fontSize?: number;
  // Icon (optional)
  iconSrc?: string;
  iconSize?: { w: number; h: number };
  // Timing
  boxExpandStart: number;
  boxExpandEnd: number;
  boxCollapseStart: number;
  boxCollapseEnd: number;
  textEnterStart: number;
  textEnterEnd: number;
  textExitStart: number;
  textExitEnd: number;
  iconFadeStart?: number;
  iconFadeEnd?: number;
  // Slide X (optional)
  slideXStart?: number;
  slideXEnd?: number;
  slideXDistance?: number; // px to slide (positive = starts further right)
  // Position
  y: number;
  rightX: number; // right edge X position
  boxHeight?: number;
  padding?: string;
}

const SlideRevealBox: React.FC<SlideRevealBoxProps> = ({
  text,
  fontFamily,
  boxColor,
  textColor,
  fontSize = 30,
  iconSrc,
  boxExpandStart,
  boxExpandEnd,
  boxCollapseStart,
  boxCollapseEnd,
  textEnterStart,
  textEnterEnd,
  textExitStart,
  textExitEnd,
  iconFadeStart = 0,
  iconFadeEnd = 20,
  slideXStart = 0,
  slideXEnd = 1,
  slideXDistance = 0,
  y,
  rightX,
  boxHeight = 46,
  padding = "0 8px 0 15px",
}) => {
  const frame = useCurrentFrame();

  // ─── Reveal progress (expand from right, collapse to right) ───
  const enterReveal = interpolate(
    frame,
    [boxExpandStart, boxExpandEnd],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );
  const exitReveal = interpolate(
    frame,
    [boxCollapseStart, boxCollapseEnd],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    },
  );
  const reveal = frame >= boxCollapseStart ? exitReveal : enterReveal;
  const clipLeft = (1 - reveal) * 100;

  // ─── TranslateX (slide from right to final position) ───
  const translateX = interpolate(
    frame,
    [slideXStart, slideXEnd],
    [slideXDistance, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );

  // ─── Text opacity ───
  const textEnterOpacity = interpolate(
    frame,
    [textEnterStart, textEnterEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const textExitOpacity = interpolate(
    frame,
    [textExitStart, textExitEnd],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const textOpacity =
    frame >= textExitStart ? textExitOpacity : textEnterOpacity;

  // ─── Icon opacity (only if icon provided) ───
  let finalIconOpacity = 0;
  if (iconSrc) {
    const iconOpacity = interpolate(
      frame,
      [iconFadeStart, iconFadeEnd],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
    const iconExitOpacity = interpolate(
      frame,
      [boxCollapseStart, boxCollapseEnd],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
    finalIconOpacity =
      frame >= boxCollapseStart
        ? Math.min(iconOpacity, iconExitOpacity)
        : iconOpacity;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: y - boxHeight / 2,
        right: 1080 - rightX,
        height: boxHeight,
        direction: "rtl",
        transform: `translateX(${translateX}px)`,
        clipPath: `inset(0 0 0 ${clipLeft}%)`,
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "100%",
          height: "100%",
          backgroundColor: boxColor,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "100%",
          padding,
          gap: 10,
        }}
      >
        {iconSrc && (
          <div
            style={{
              width: 30,
              height: boxHeight,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              opacity: finalIconOpacity,
            }}
          >
            <Img
              src={iconSrc}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        )}
        <div
          style={{
            opacity: textOpacity,
            fontFamily: `'${fontFamily}', Arial, sans-serif`,
            fontSize,
            color: textColor,
            whiteSpace: "nowrap",
            lineHeight: 1,
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default SlideRevealBox;
