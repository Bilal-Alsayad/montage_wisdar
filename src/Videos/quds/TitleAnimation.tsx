import { Easing, interpolate, useCurrentFrame } from "remotion";
import { measureText } from "@remotion/layout-utils";
import { splitTitle } from "../../utils/textUtils";

type TitleAnimationProps = {
  text: string;
  fontFamily: string;
};

const REVEAL_ENTER = 45;
const REVEAL_HOLD = 60;
const REVEAL_EXIT = 45;

export const TITLE_ANIMATION_DURATION = 150;

const REVEAL_EASE = Easing.bezier(0.333, 0, 0.667, 1);

const MAX_SINGLE_LINE_WIDTH = 900;

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();

  const { width: fullWidth } = measureText({
    text,
    fontFamily,
    fontSize: 80,
  });

  const needsTwoLines = fullWidth > MAX_SINGLE_LINE_WIDTH;

  const { text1, text2 } = needsTwoLines
    ? splitTitle(text)
    : { text1: text, text2: "" };

  const isTwoLines = text2 !== "";

  const { width: width1 } = measureText({
    text: text1,
    fontFamily,
    fontSize: 80,
  });

  const { width: width2 } = isTwoLines
    ? measureText({
        text: text2,
        fontFamily,
        fontSize: 80,
      })
    : { width: 0 };

  const textWidth = Math.max(width1, width2);
  const boxHeight = isTwoLines ? 100 * 2 : 100;

  const revealEnd = REVEAL_ENTER;
  const holdEnd = revealEnd + REVEAL_HOLD;
  const exitEnd = holdEnd + REVEAL_EXIT;

  const progress = interpolate(
    frame,
    [0, revealEnd, holdEnd, exitEnd],
    [0, 1, 1, 0],
    {
      ...CLAMP,
      easing: REVEAL_EASE,
    }
  );

  const paddingX = interpolate(
    progress,
    [0, 1],
    [95, 20],
    CLAMP
  );

  const boxWidth = textWidth + paddingX * 2;
  const visibleWidth = boxWidth * progress;

  const isFullyVisible = progress >= 0.999;

  const textMask = isFullyVisible
    ? `linear-gradient(90deg, black 0%, black 100%)`
    : `
      linear-gradient(
        90deg,
        black 0px,
        black ${Math.max(0, visibleWidth - 75)}px,
        transparent ${visibleWidth}px,
        transparent 100%
      )
    `;

  return (
    <div
      style={{
        position: "absolute",
        left: 540,
        top: 1500,
        transform: "translateX(-50%)",
        width: boxWidth,
        height: boxHeight,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#CDBAA3",
          clipPath: `inset(0 ${100 - progress * 100}% 0 0)`, //animasyon
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily,
          fontSize: 80,
          lineHeight: `100px`,
          color: "#000000",
          padding: `0 20px`,
          textAlign: "center",
          WebkitMaskImage: textMask, //animasyon
        }}
      >
        <div>{text1}</div>
        {isTwoLines && <div>{text2}</div>}
      </div>
    </div>
  );
}