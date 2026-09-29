import {
  Easing,
  interpolate,
  interpolateColors,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {splitTextIntoMultipleLines} from "../../utils/textUtils";

interface TitleAnimationProps {
  text: string;
  fontFamily: string;
}

export const TITLE_ANIMATION_DURATION = 150;

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sourceFrame = frame * (25 / fps);
  const animationFrame =
    sourceFrame <= 68 ? sourceFrame : Math.max(0, 125 - sourceFrame);
  const lines = splitTextIntoMultipleLines(text, 3);

  const reveal = (text: string, start: number, end: number) => {
    const characters = [...text];
    const revealed = interpolate(
      animationFrame,
      [start, end],
      [0, characters.length],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.333, 0, 0.667, 1),
      },
    );

    return characters.map((character, index) => (
      <span
        key={index}
        style={{
          display: "inline-block",
          whiteSpace: "pre",
          opacity: interpolate(
            revealed,
            [index, index + 1],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
        }}
      >
        {character}
      </span>
    ));
  };

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      {lines[0]?.trim() && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: -90,
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "-10px -45px",
              backgroundColor: "#313940",
              transform: `scaleX(${interpolate(
                animationFrame,
                [0, 13],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.333, 0, 0.667, 1),
                },
              )})`,
              transformOrigin: "right",
            }}
          />

          <div
            style={{
              position: "relative",
              fontFamily,
              fontSize: 80,
              lineHeight: "100px",
              color: interpolateColors(
                animationFrame,
                [3, 14],
                ["#171717", "#FFFFFF"],
              ),
            }}
          >
            {reveal(lines[0], 2, 19)}
          </div>
        </div>
      )}

      {lines[1]?.trim() && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: -45,
              right: -45,
              top: interpolate(animationFrame, [4, 22], [7, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.333, 0, 0.803, 1),
              }),
              height: interpolate(animationFrame, [4, 22], [86, 99], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.333, 0, 0.803, 1),
              }),
              backgroundColor: "#212A31",
              transform: `scaleX(${interpolate(
                animationFrame,
                [4, 22],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.333, 0, 0.803, 1),
                },
              )})`,
              transformOrigin: "right",
            }}
          />

          <div
            style={{
              position: "relative",
              fontFamily,
              fontSize: 80,
              lineHeight: "100px",
              color: interpolateColors(
                animationFrame,
                [10, 19],
                ["#313940", "#FFFFFF"],
              ),
            }}
          >
            {reveal(lines[1], 7, 24)}
          </div>
        </div>
      )}

      {lines[2]?.trim() && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 87,
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: -45,
              right: -45,
              bottom: 2,
              height: 6,
              backgroundColor: "#212A31",
              transform: `scaleX(${interpolate(
                animationFrame,
                [4, 22],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.333, 0, 0.803, 1),
                },
              )})`,
              transformOrigin: "right",
            }}
          />

          <div
            style={{
              position: "relative",
              fontFamily,
              fontSize: 80,
              lineHeight: "100px",
              color: interpolateColors(
                animationFrame,
                [17, 26],
                ["#313940", "#FFFFFF"],
              ),
            }}
          >
            {reveal(lines[2], 14, 31)}
          </div>
        </div>
      )}
    </div>
  );
}
