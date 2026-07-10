import { Easing, interpolate, useCurrentFrame } from "remotion";
import { measureText } from "@remotion/layout-utils";

type TitleAnimationProps = {
  text: string;
  fontFamily: string;
};

const REVEAL_ENTER = 45;
const REVEAL_HOLD = 60;
const REVEAL_EXIT = 45;

export const TITLE_ANIMATION_DURATION = 150;

const NORMAL_PADDING_X = 20;
const START_PADDING_X = 95;

const TEXT_FEATHER_PX = 75;

const REVEAL_EASE = Easing.bezier(0.333, 0, 0.667, 1);

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();

  const { width: textWidth } = measureText({
    text,
    fontFamily,
    fontSize: 80,
  });

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
    [START_PADDING_X, NORMAL_PADDING_X],
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
        black ${Math.max(0, visibleWidth - TEXT_FEATHER_PX)}px,
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
        height: 100,
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
          alignItems: "center",
          fontFamily,
          fontSize: 80,
          lineHeight: `100px`,
          color: "#000000",
          padding: `0 20px`,
          WebkitMaskImage: textMask, //animasyon
        }}
      >
        {text}
      </div>
    </div>
  );
}