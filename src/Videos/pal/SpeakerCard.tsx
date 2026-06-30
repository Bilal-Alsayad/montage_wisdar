import { fitText, measureText } from "@remotion/layout-utils";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import SpeakerDecoration from "./SpeakerDecoration";

export const PAL_SPEAKER_CARD_DURATION = 187;

type SpeakerCardProps = {
  name: string;
  description: string;
  fontFamily?: string;
  x?: number;
  y?: number;
  width?: number | "fit-content";
  rowHeight?: number;
  gap?: number;
};

const RED_BACKGROUND = "linear-gradient(90deg, #b50815 30%, #ef3038 100%)";
const WHITE_BACKGROUND = "#f5f5f5";
const SPEAKER_DECORATION_X = -59;
const SPEAKER_DECORATION_Y = -353;
const SPEAKER_DECORATION_SCALE = 0.3;
const SPEAKER_BOX_OFFSET_X = -14;
const SPEAKER_TEXT_HORIZONTAL_PADDING = 28;
const SPEAKER_NAME_FONT_WEIGHT = 600;
const SPEAKER_DESCRIPTION_FONT_WEIGHT = 400;
const SPEAKER_LETTER_SPACING = "0px";
const SPEAKER_TEXT_TRANSFORM = "none";
const LAST_ANIMATION_FRAME = 6;
const SPEAKER_MAX_WIDTH = 365;
const SPEAKER_NAME_MAX_FONT_SIZE = 24;
const SPEAKER_DESCRIPTION_MAX_FONT_SIZE = 22;

const getAnimationFrame = (frame: number) => {
  const outroStart = PAL_SPEAKER_CARD_DURATION - (LAST_ANIMATION_FRAME + 1);

  if (frame <= LAST_ANIMATION_FRAME) {
    return frame;
  }

  if (frame < outroStart) {
    return LAST_ANIMATION_FRAME;
  }

  return Math.max(0, PAL_SPEAKER_CARD_DURATION - 1 - frame);
};

export default function SpeakerCard({
  name,
  description,
  fontFamily = "Rubik",
  x = 118,
  y = 962,
  width = "fit-content",
  rowHeight = 52,
  gap = 4,
}: SpeakerCardProps) {
  const animationFrame = getAnimationFrame(useCurrentFrame());
  const showGhostRed = animationFrame >= 0 && animationFrame <= 2;
  const ghostWhiteOpacity =
    animationFrame === 1 ? 0.25 : animationFrame === 2 ? 0.5 : 0;
  const showMainRed = animationFrame >= 3;
  const thirdRowWhiteOpacity =
    animationFrame === 4 ? 0.5 : animationFrame === 5 ? 1 : 0;
  const showSecondRowWhite = animationFrame >= 6;
  const showName = animationFrame >= 3;
  const showDescription = animationFrame >= 6;

  const measuredNameWidth = measureText({
    text: name,
    fontFamily,
    fontSize: SPEAKER_NAME_MAX_FONT_SIZE,
    fontWeight: SPEAKER_NAME_FONT_WEIGHT,
    letterSpacing: SPEAKER_LETTER_SPACING,
    textTransform: SPEAKER_TEXT_TRANSFORM,
    validateFontIsLoaded: true,
  }).width;
  const measuredDescriptionWidth = measureText({
    text: description,
    fontFamily,
    fontSize: SPEAKER_DESCRIPTION_MAX_FONT_SIZE,
    fontWeight: SPEAKER_DESCRIPTION_FONT_WEIGHT,
    letterSpacing: SPEAKER_LETTER_SPACING,
    textTransform: SPEAKER_TEXT_TRANSFORM,
    validateFontIsLoaded: true,
  }).width;
  const fitTextWidth =
    width === "fit-content"
      ? Math.min(
          SPEAKER_MAX_WIDTH,
          Math.ceil(
            Math.max(measuredNameWidth, measuredDescriptionWidth) +
              SPEAKER_TEXT_HORIZONTAL_PADDING,
          ),
        )
      : width;

  const { fontSize: fittedNameFontSize } = fitText({
    text: name,
    withinWidth: fitTextWidth - SPEAKER_TEXT_HORIZONTAL_PADDING,
    fontFamily,
    fontWeight: SPEAKER_NAME_FONT_WEIGHT,
    letterSpacing: SPEAKER_LETTER_SPACING,
    textTransform: SPEAKER_TEXT_TRANSFORM,
    validateFontIsLoaded: true,
  });

  const { fontSize: fittedDescriptionFontSize } = fitText({
    text: description,
    withinWidth: fitTextWidth - SPEAKER_TEXT_HORIZONTAL_PADDING,
    fontFamily,
    fontWeight: SPEAKER_DESCRIPTION_FONT_WEIGHT,
    letterSpacing: SPEAKER_LETTER_SPACING,
    textTransform: SPEAKER_TEXT_TRANSFORM,
    validateFontIsLoaded: true,
  });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: "fit-content",
          height: rowHeight * 4,
          overflow: "visible",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <SpeakerDecoration
          x={SPEAKER_DECORATION_X}
          y={SPEAKER_DECORATION_Y}
          scale={SPEAKER_DECORATION_SCALE}
        />

        {showGhostRed ? (
          <div
            style={{
              position: "absolute",
              left: SPEAKER_BOX_OFFSET_X,
              top: rowHeight * 2,
              width: fitTextWidth,
              height: rowHeight,
              background: RED_BACKGROUND,
              opacity: 0.15,
            }}
          />
        ) : null}

        {ghostWhiteOpacity > 0 ? (
          <div
            style={{
              position: "absolute",
              left: SPEAKER_BOX_OFFSET_X,
              top: rowHeight * 2,
              width: fitTextWidth,
              height: rowHeight,
              backgroundColor: WHITE_BACKGROUND,
              opacity: ghostWhiteOpacity,
            }}
          />
        ) : null}

        {showMainRed ? (
          <div
            style={{
              position: "absolute",
              left: SPEAKER_BOX_OFFSET_X,
              top: 0,
              width: fitTextWidth,
              height: rowHeight,
              background: RED_BACKGROUND,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              boxSizing: "border-box",
              paddingLeft: 14,
              paddingRight: 14,
            }}
          >
            {showName ? (
              <span
                style={{
                  color: "#ffffff",
                  fontFamily,
                  fontSize: Math.min(
                    SPEAKER_NAME_MAX_FONT_SIZE,
                    fittedNameFontSize,
                  ),
                  fontWeight: SPEAKER_NAME_FONT_WEIGHT,
                  letterSpacing: SPEAKER_LETTER_SPACING,
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  textTransform: SPEAKER_TEXT_TRANSFORM,
                  unicodeBidi: "plaintext",
                }}
              >
                {name}
              </span>
            ) : null}
          </div>
        ) : null}

        {thirdRowWhiteOpacity > 0 ? (
          <div
            style={{
              position: "absolute",
              left: SPEAKER_BOX_OFFSET_X,
              top: rowHeight * 2,
              width: fitTextWidth,
              height: rowHeight,
              backgroundColor: WHITE_BACKGROUND,
              opacity: thirdRowWhiteOpacity,
            }}
          />
        ) : null}

        {showSecondRowWhite ? (
          <div
            style={{
              position: "absolute",
              left: SPEAKER_BOX_OFFSET_X,
              top: rowHeight + gap,
              width: fitTextWidth,
              height: rowHeight,
              backgroundColor: WHITE_BACKGROUND,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              boxSizing: "border-box",
              paddingLeft: 14,
              paddingRight: 14,
            }}
          >
            {showDescription ? (
              <span
                style={{
                  color: "#666666",
                  fontFamily,
                  fontSize: Math.min(
                    SPEAKER_DESCRIPTION_MAX_FONT_SIZE,
                    fittedDescriptionFontSize,
                  ),
                  fontWeight: SPEAKER_DESCRIPTION_FONT_WEIGHT,
                  letterSpacing: SPEAKER_LETTER_SPACING,
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  textTransform: SPEAKER_TEXT_TRANSFORM,
                  unicodeBidi: "plaintext",
                }}
              >
                {description}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
}
