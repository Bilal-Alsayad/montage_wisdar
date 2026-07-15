import { Easing, interpolate, useCurrentFrame } from "remotion";

export const TITLE_ANIMATION_DURATION = 99;

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const TEXT_EASING = Easing.bezier(0.167, 0.167, 0.833, 0.833);
const LINE_EASING = Easing.bezier(0.167, 0.167, 0.667, 1);

const TEXT_ENTER_START = 1;
const TEXT_ENTER_END = 6;
const TEXT_EXIT_START = 92;
const TEXT_EXIT_END = 99;

const LINE_ENTER_START = 1;
const LINE_ENTER_END = 6;
const LINE_EXIT_START = 92;
const LINE_EXIT_END = 97;

interface TitleAnimationProps {
  text?: string;
  fontFamily: string;
}

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();

  const textEnter = interpolate(
    frame,
    [TEXT_ENTER_START, TEXT_ENTER_END],
    [0, 1],
    { ...CLAMP, easing: TEXT_EASING },
  );
  const textExit = interpolate(
    frame,
    [TEXT_EXIT_START, TEXT_EXIT_END],
    [1, 0],
    { ...CLAMP, easing: TEXT_EASING },
  );
  const textOpacity = Math.min(textEnter, textExit);

  const lineEnter = interpolate(
    frame,
    [LINE_ENTER_START, LINE_ENTER_END],
    [0, 1],
    { ...CLAMP, easing: LINE_EASING },
  );
  const lineExit = interpolate(
    frame,
    [LINE_EXIT_START, LINE_EXIT_END],
    [1, 0],
    { ...CLAMP, easing: LINE_EASING },
  );
  const lineOpacity = Math.min(lineEnter, lineExit);

  if (!text) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 1090,
        transform: "translateX(-50%)",
        width: "90%",
      }}
    >
      <div
        style={{
          fontFamily,
          fontSize: 77,
          color: "white",
          lineHeight: "80px",
          textAlign: "left",
          opacity: textOpacity,
        }}
      >
        {text}
      </div>
      <div
        style={{
          marginTop: 40,
          width: "100%",
          height: 10,
          backgroundColor: "#cc2127",
          opacity: lineOpacity,
        }}
      />
    </div>
  );
}