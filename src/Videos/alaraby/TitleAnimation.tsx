import {
  AbsoluteFill,
  Easing,
  interpolate,
  interpolateColors,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Audio } from "@remotion/media";
import { splitTitle } from "../../utils/textUtils";

interface TitleAnimationProps {
  text: string;
  fontFamily: string;
}

export const TITLE_ANIMATION_DURATION = 188;

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();
  const { text1, text2 } = splitTitle(text);

  if (!text1) {
    return null;
  }

  const sourceFrame = frame / 1.2;
  const fadeOutStart = TITLE_ANIMATION_DURATION - 30;

  const animationFrame =
    frame < fadeOutStart
      ? sourceFrame
      : interpolate(
          frame,
          [fadeOutStart, TITLE_ANIMATION_DURATION - 1],
          [25, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.333, 0, 0.667, 1),
          },
        );

  const clamp = {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  } as const;

  const firstReveal = interpolate(animationFrame, [0, 20], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.333, 0, 0, 1),
  });

  const secondReveal = interpolate(animationFrame, [6, 16], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.333, 0, 0, 1),
  });

  return (
    <AbsoluteFill>
      <Audio src={staticFile("alaraby/sounds/in.wav")} />

      <Sequence from={fadeOutStart}>
        <Audio src={staticFile("alaraby/sounds/out.wav")} />
      </Sequence>

      <div
        dir="rtl"
        style={{
          position: "absolute",
          top: 1000,
          right: 157,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          fontFamily,
          fontSize: 73,
          whiteSpace: "nowrap",
          opacity: interpolate(
            frame,
            [
              TITLE_ANIMATION_DURATION - 12,
              TITLE_ANIMATION_DURATION - 1,
            ],
            [1, 0],
            clamp,
          ),
          transform: `translateY(${interpolate(
            frame,
            [
              TITLE_ANIMATION_DURATION - 20,
              TITLE_ANIMATION_DURATION - 1,
            ],
            [0, 28.4],
            {
              ...clamp,
              easing: Easing.bezier(0.787, 0, 0.997, 1),
            },
          )}px)`,
        }}
      >
        <div
          style={{
            position: "relative",
            height: 108,
            padding: "0 31px",
            display: "flex",
            alignItems: "center",
            transform: `translateY(${interpolate(
              animationFrame,
              [-2, 18],
              [-92, 0],
              {
                ...clamp,
                easing: Easing.bezier(0.333, 0, 0.119, 1),
              },
            )}px)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#CC2E2E",
              transformOrigin: "right",
              transform: `scaleX(${firstReveal})`,
            }}
          />

          <span
            style={{
              position: "relative",
              color: interpolateColors(
                Math.min(9, Math.max(2, animationFrame)),
                [2, 9],
                ["#000000", "#FFFFFF"],
              ),
              clipPath: `inset(0 0 0 ${100 - firstReveal * 100}%)`,
            }}
          >
            {text1}
          </span>
        </div>

        {text2 && (
          <div
            style={{
              position: "relative",
              height: 108,
              padding: "0 31px",
              display: "flex",
              alignItems: "center",
              transform: `translateY(${interpolate(
                animationFrame,
                [4, 24],
                [-94, 0],
                {
                  ...clamp,
                  easing: Easing.bezier(0.333, 0, 0.119, 1),
                },
              )}px)`,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#FFFFFF",
                transformOrigin: "right",
                transform: `scaleX(${secondReveal})`,
              }}
            />

            <span
              style={{
                position: "relative",
                color: interpolateColors(
                  Math.min(43, Math.max(8, animationFrame)),
                  [8, 15, 43],
                  ["#000000", "#FFFFFF", "#CC2E2E"],
                ),
                clipPath: `inset(0 0 0 ${100 - secondReveal * 100}%)`,
              }}
            >
              {text2}
            </span>
          </div>
        )}

        <div
          style={{
            position: "absolute",
            width: 53,
            height: 53,
            top: -17,
            right: -26,
            backgroundColor: "#FFFFFF",
            transformOrigin: "center",
            transform: `
              translateY(${interpolate(
                animationFrame,
                [-6, 7],
                [-148, 0],
                clamp,
              )}px)
              scaleX(${interpolate(
                animationFrame,
                [-1, 7],
                [0, 1],
                {
                  ...clamp,
                  easing: Easing.bezier(0.167, 0, 0, 1),
                },
              )})
              scaleY(${interpolate(
                animationFrame,
                [-1, 7],
                [0, 1],
                {
                  ...clamp,
                  easing: Easing.bezier(0.167, 0, 0.667, 1),
                },
              )})
            `,
          }}
        />
      </div>
    </AbsoluteFill>
  );
}
