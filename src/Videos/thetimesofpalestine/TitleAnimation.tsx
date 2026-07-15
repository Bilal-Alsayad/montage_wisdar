import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { splitTitle } from "../../utils/textUtils";

interface TitleAnimationProps {
  text: string;
  fontFamily: string;
}

interface AnimatedLineProps {
  text: string;
  fontFamily: string;
  top: number;
  backgroundColor: string;
  horizontalPadding: number;
  enterStart: number;
  enterEnd: number;
  exitStart: number;
  exitEnd: number;
}

export const TITLE_ANIMATION_DURATION = 150;

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

function getProgress(
  frame: number,
  enterStart: number,
  enterEnd: number,
  exitStart: number,
  exitEnd: number,
  easing: (input: number) => number,
): number {
  return interpolate(
    frame,
    frame < exitStart
      ? [enterStart, enterEnd]
      : [exitStart, exitEnd],
    frame < exitStart ? [0, 1] : [1, 0],
    {
      ...CLAMP,
      easing,
    },
  );
}

function AnimatedCharacters({
  text,
  progress,
}: {
  text: string;
  progress: number;
}) {
  const characters = [...text];

  return (
    <>
      {characters.map((character, index) => (
        <span
          key={index}
          style={{
            display: "inline-block",
            opacity: interpolate(
              progress,
              [
                index / characters.length,
                Math.min(
                  1,
                  index / characters.length + 0.35,
                ),
              ],
              [0, 1],
              CLAMP,
            ),
          }}
        >
          {character === " " ? "\u00A0" : character}
        </span>
      ))}
    </>
  );
}

function AnimatedLine({
  text,
  fontFamily,
  top,
  backgroundColor,
  horizontalPadding,
  enterStart,
  enterEnd,
  exitStart,
  exitEnd,
}: AnimatedLineProps) {
  const frame = useCurrentFrame();
  const trimmedText = text.trim();

  if (!trimmedText) {
    return null;
  }

  const finalWidth =
    trimmedText.length * 46.4 + horizontalPadding * 2;

  if (finalWidth <= 100) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 540 - finalWidth / 2, //WHAT ?!?!?! 
        width:
          finalWidth *
          getProgress(
            frame,
            enterStart,
            enterEnd,
            exitStart,
            exitEnd,
            Easing.bezier(0.5, 0, 0.5, 1),
          ),
        height: 104,
        overflow: "hidden",
        backgroundColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: finalWidth,
          height: 104,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFFFFF",
          fontFamily,
          fontSize: 80,
          lineHeight: "100px",
          whiteSpace: "nowrap",
        }}
      >
        <AnimatedCharacters
          text={trimmedText}
          progress={getProgress(
            frame,
            enterStart,
            enterEnd,
            exitStart,
            exitEnd,
            Easing.bezier(0.333, 0, 0.667, 1),
          )}
        />
      </div>
    </div>
  );
}

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const { text1, text2 } = splitTitle(text);

  return (
    <AbsoluteFill>
      <AnimatedLine
        text={text1}
        fontFamily={fontFamily}
        top={1435}
        backgroundColor="#FF0008"
        horizontalPadding={20}
        enterStart={4}
        enterEnd={49}
        exitStart={106}
        exitEnd={150}
      />

      <AnimatedLine
        text={text2}
        fontFamily={fontFamily}
        top={1555}
        backgroundColor="#000000"
        horizontalPadding={15}
        enterStart={0}
        enterEnd={45}
        exitStart={102}
        exitEnd={147}
      />
    </AbsoluteFill>
  );
}