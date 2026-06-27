import { interpolate, useCurrentFrame, Easing } from "remotion";

interface TextBoxWithShadowProps {
  text: string;
  boxColor: string;
  textColor: string;
  x?: number; // Horizontal position (default: 540 = center)
  y: number;
  startFrame: number;
  opacityEndFrame: number;
  positionStartFrame?: number;
  positionEndFrame?: number;
  exitStartFrame?: number;
  exitDuration?: number;
  textFadeOffset?: number; // How many frames text is offset from box (default: 10)
  startY?: number;
  endY?: number;
  fontSize?: number;
  fontFamily?: string;
  paddingX?: number;
  paddingY?: number;
  borderRadius?: number;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetY?: number;
  opacity?: number;
  align?: "center" | "right" | "left"; // Text alignment (default: center)
  border?: string;
}

/**
 * TextBoxWithShadow - A text box with drop shadow effect
 * Entrance: Box appears first → Text fades in after
 * Exit: Text fades out first → Box disappears after (mirror of entrance)
 */
export default function TextBoxWithShadow({
  text,
  boxColor,
  textColor,
  x,
  y,
  startFrame,
  opacityEndFrame,
  positionStartFrame,
  positionEndFrame,
  exitStartFrame,
  exitDuration = 36,
  textFadeOffset = 10, // Text is offset by 10 frames from box
  startY,
  endY,
  fontSize = 85,
  fontFamily = "Arial, sans-serif",
  paddingX = 40,
  paddingY = 25,
  borderRadius = 20,
  shadowColor = "rgba(0, 0, 0, 0.35)",
  shadowBlur = 15,
  shadowOffsetY = 8,
  opacity: fixedOpacity,
  align = "center",
  border,
}: TextBoxWithShadowProps) {
  const frame = useCurrentFrame();

  // Calculate durations
  const textFadeDuration = 15; // Smooth fade duration for text

  // === BOX OPACITY ===
  // Enter: 0 → 100 over enterDuration
  const boxEnterOpacity =
    fixedOpacity ??
    interpolate(frame, [startFrame, opacityEndFrame], [0, 100], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });

  // Exit: 100 → 0 over same duration as enter (mirrored)
  const exitEndFrame =
    exitStartFrame !== undefined ? exitStartFrame + exitDuration : 0;
  const boxExitOpacity =
    exitStartFrame !== undefined
      ? interpolate(frame, [exitStartFrame, exitEndFrame], [100, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.in(Easing.cubic),
        })
      : 100;

  const boxOpacity = Math.min(boxEnterOpacity, boxExitOpacity) / 100;

  // === TEXT OPACITY (offset from box) ===
  // Entrance: Text fades in AFTER box (box first, then text)
  const textEnterStart = startFrame + textFadeOffset;
  const textEnterEnd = textEnterStart + textFadeDuration;
  const textEnterOpacity = interpolate(
    frame,
    [textEnterStart, textEnterEnd],
    [0, 100],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );

  // Exit: Text fades out BEFORE box (text first, then box) - MIRRORED
  const textExitStart =
    exitStartFrame !== undefined ? exitStartFrame - textFadeOffset : 9999;
  const textExitEnd = textExitStart + textFadeDuration;
  const textExitOpacity = interpolate(
    frame,
    [textExitStart, textExitEnd],
    [100, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    },
  );

  const textOpacity = Math.min(textEnterOpacity, textExitOpacity) / 100;

  // === POSITION ANIMATION ===
  // Entrance: startY → endY (moves down)
  const enterY =
    positionStartFrame !== undefined &&
    positionEndFrame !== undefined &&
    startY !== undefined &&
    endY !== undefined
      ? interpolate(
          frame,
          [positionStartFrame, positionEndFrame],
          [startY, endY],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          },
        )
      : y;

  // Exit: endY → startY (moves up, mirrored)
  const exitY =
    exitStartFrame !== undefined && startY !== undefined && endY !== undefined
      ? interpolate(frame, [exitStartFrame, exitEndFrame], [endY, startY], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.in(Easing.cubic),
        })
      : enterY;

  // Use enter position until exit starts, then use exit position
  const currentY =
    exitStartFrame !== undefined && frame >= exitStartFrame ? exitY : enterY;

  const boxHeight = fontSize + paddingY * 2;

  // Don't render before start frame
  if (frame < startFrame) return null;

  return (
    <div
      style={{
        position: "absolute",
        right: align === "right" ? (x ?? 0) : undefined,
        left: align === "right" ? undefined : (x ?? 540),
        top: currentY - boxHeight / 2,
        transform: align === "center" ? "translateX(-50%)" : undefined,
        height: boxHeight,
        paddingLeft: paddingX,
        paddingRight: paddingX,
        background: boxColor,
        borderRadius,
        border,
        opacity: boxOpacity,
        boxShadow: `0 ${shadowOffsetY}px ${shadowBlur}px ${shadowColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        whiteSpace: "nowrap",
        width: "max-content",
        maxWidth: "100%",
      }}
    >
      <div
        style={{
          fontFamily,
          fontSize,
          color: textColor,
          whiteSpace: "nowrap",
          lineHeight: 1,
          opacity: textOpacity, // Separate opacity for text
        }}
      >
        {text}
      </div>
    </div>
  );
}
