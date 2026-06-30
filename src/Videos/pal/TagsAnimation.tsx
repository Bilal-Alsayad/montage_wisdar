import { fitText } from "@remotion/layout-utils";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import TagsDecoration from "./TagsDecoration";

type TagsAnimationProps = {
  text: string;
  icon: "location" | "date";
  durationInFrames: number;
  rectX: number;
  rectY: number;
  squareStartX: number;
  squareStartY: number;
  fontFamily?: string;
  finalRectWidth?: number;
  finalRectHeight?: number;
  squareSize?: number;
  fontSize?: number;
};

const GHOST_COLOR = "#aaaaaa";
const WHITE_BACKGROUND = "#ffffff";
const STEP_DURATION = 2;
const LAST_STEP = 6;
const STEP_COUNT = LAST_STEP + 1;
const TAG_TEXT_HORIZONTAL_PADDING = 0;
const TAG_FONT_WEIGHT = 500;
const TAG_LETTER_SPACING = "0px";
const TAG_TEXT_TRANSFORM = "none";

const ICON_SRC = {
  location: "pal/icons/location.png",
  date: "pal/icons/date.png",
};

const DECORATION_BY_ICON = {
  location: { x: -76, y: -224, scale: 0.23 },
  date: { x: -80, y: -273, scale: 0.23 },
};

const getStep = (frame: number, durationInFrames: number) => {
  const transitionDuration = STEP_COUNT * STEP_DURATION;
  const outroStart = durationInFrames - transitionDuration;

  if (frame < transitionDuration) {
    return Math.min(LAST_STEP, Math.floor(frame / STEP_DURATION));
  }

  if (frame < outroStart) {
    return LAST_STEP;
  }

  return Math.max(
    0,
    Math.min(
      LAST_STEP,
      Math.floor((durationInFrames - 1 - frame) / STEP_DURATION),
    ),
  );
};

export default function TagsAnimation({
  text,
  icon,
  durationInFrames,
  rectX,
  rectY,
  squareStartX,
  squareStartY,
  fontFamily = "Rubik",
  finalRectWidth = 190,
  finalRectHeight = 44,
  squareSize = 44,
  fontSize = 22,
}: TagsAnimationProps) {
  const frame = useCurrentFrame();

  if (!text) {
    return null;
  }

  const step = getStep(frame, durationInFrames);
  const iconSrc = staticFile(ICON_SRC[icon]);
  const decoration = DECORATION_BY_ICON[icon];
  const squareFinalX = rectX - squareSize;
  const squareFinalY = rectY;
  const { fontSize: fittedFontSize } = fitText({
    text,
    withinWidth: finalRectWidth - TAG_TEXT_HORIZONTAL_PADDING * 2,
    fontFamily,
    fontWeight: TAG_FONT_WEIGHT,
    letterSpacing: TAG_LETTER_SPACING,
    textTransform: TAG_TEXT_TRANSFORM,
    validateFontIsLoaded: true,
  });

  const showFirstGhostRect = step === 0;
  const showSecondGhostRect = step === 1;
  const showMiniSquare = step === 1;
  const showFadedGhostRect = step === 2;
  const showGrayIconSquare = step === 2;
  const showRedSquare = step >= 3;
  const showHalfWhiteRect = step === 4;
  const showFullLowerWhiteRect = step === 5;
  const showFinalWhiteRect = step === 6;
  const showText = step === 6;

  return (
    <AbsoluteFill>
      <TagsDecoration
        x={rectX + decoration.x}
        y={rectY + decoration.y}
        scale={decoration.scale}
      />

      {showFirstGhostRect ? (
        <div
          style={{
            position: "absolute",
            left: rectX,
            top: rectY + 10,
            width: finalRectWidth,
            height: 14,
            backgroundColor: GHOST_COLOR,
            opacity: 0.45,
          }}
        />
      ) : null}

      {showSecondGhostRect ? (
        <div
          style={{
            position: "absolute",
            left: rectX,
            top: rectY + 5,
            width: finalRectWidth,
            height: 28,
            backgroundColor: GHOST_COLOR,
            opacity: 0.7,
          }}
        />
      ) : null}

      {showMiniSquare ? (
        <div
          style={{
            position: "absolute",
            left: squareStartX,
            top: squareStartY,
            width: 18,
            height: 18,
            backgroundColor: GHOST_COLOR,
            opacity: 0.45,
          }}
        />
      ) : null}

      {showFadedGhostRect ? (
        <div
          style={{
            position: "absolute",
            left: rectX,
            top: rectY,
            width: finalRectWidth,
            height: 28,
            backgroundColor: GHOST_COLOR,
            opacity: 0.25,
          }}
        />
      ) : null}

      {showGrayIconSquare ? (
        <div
          style={{
            position: "absolute",
            left: squareStartX,
            top: squareStartY,
            width: squareSize,
            height: squareSize,
            backgroundColor: "#cdcdcd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Img
            src={iconSrc}
            style={{
              width: 28,
              height: 28,
              objectFit: "contain",
            }}
          />
        </div>
      ) : null}

      {showRedSquare ? (
        <div
          style={{
            position: "absolute",
            left: squareFinalX,
            top: squareFinalY,
            width: squareSize,
            height: squareSize,
            background: "linear-gradient(135deg, #b50815 80%, #ef3038 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Img
            src={iconSrc}
            style={{
              width: 28,
              height: 28,
              objectFit: "contain",
            }}
          />
        </div>
      ) : null}

      {showHalfWhiteRect ? (
        <div
          style={{
            position: "absolute",
            left: rectX,
            top: rectY + finalRectHeight,
            width: finalRectWidth,
            height: finalRectHeight,
            backgroundColor: WHITE_BACKGROUND,
            opacity: 0.5,
          }}
        />
      ) : null}

      {showFullLowerWhiteRect ? (
        <div
          style={{
            position: "absolute",
            left: rectX,
            top: rectY + finalRectHeight,
            width: finalRectWidth,
            height: finalRectHeight,
            backgroundColor: WHITE_BACKGROUND,
          }}
        />
      ) : null}

      {showFinalWhiteRect ? (
        <div
          style={{
            position: "absolute",
            left: rectX,
            top: rectY,
            width: finalRectWidth,
            height: finalRectHeight,
            backgroundColor: WHITE_BACKGROUND,
          }}
        />
      ) : null}

      {showText ? (
        <div
          style={{
            position: "absolute",
            left: rectX,
            top: rectY,
            width: finalRectWidth,
            height: finalRectHeight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#111111",
            fontFamily,
            fontSize: Math.min(fontSize, fittedFontSize),
            fontWeight: TAG_FONT_WEIGHT,
            letterSpacing: TAG_LETTER_SPACING,
            lineHeight: 1,
            whiteSpace: "nowrap",
            textTransform: TAG_TEXT_TRANSFORM,
            pointerEvents: "none",
          }}
        >
          {text}
        </div>
      ) : null}
    </AbsoluteFill>
  );
}
