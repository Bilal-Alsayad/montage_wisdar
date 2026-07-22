import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

interface SourceAnimationProps {
  text: string;
  fontFamily: string;
}

export const SOURCE_ANIMATION_DURATION = 268;

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

export default function SourceAnimation({
  text,
  fontFamily,
}: SourceAnimationProps) {
  const frame = useCurrentFrame();

  const animationFrame =
    frame < 162 ? frame / 1.2 : 222 - frame / 1.2;

  if (!text) {
    return null;
  }

  return (
    <AbsoluteFill style={{opacity: 0.6}}>
      <Img
        src={staticFile("alarabyfr/images/source.png")}
        style={{
          position: "absolute",
          left: 110,
          top: 590,
          width: 44,
          height: 44,
          opacity: interpolate(
            animationFrame,
            [0, 16.683],
            [0, 1],
            {
              ...clamp,
              easing: Easing.bezier(0.333, 0, 0.833, 1),
            },
          ),
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 112,
          top: 644,
          width: 40,
          height: 3,
          backgroundColor: "#ffffff",
          transform: `scaleX(${interpolate(
            animationFrame,
            [17, 24],
            [0, 1],
            {
              ...clamp,
              easing: Easing.bezier(0.333, 0, 0.667, 1),
            },
          )})`,
          transformOrigin: "center",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: interpolate(
            animationFrame,
            [5.367, 28],
            [115, 110],
            {
              ...clamp,
              easing: Easing.bezier(0.167, 0.167, 0, 1),
            },
          ),
          top: interpolate(
            animationFrame,
            [5.367, 28],
            [940, 654],
            {
              ...clamp,
              easing: Easing.bezier(0.167, 0.167, 0, 1),
            },
          ),
          opacity: interpolate(
            animationFrame,
            [5.367, 13],
            [0.01, 1],
            {
              ...clamp,
              easing: Easing.bezier(0.333, 0, 0.662, 1),
            },
          ),
        }}
      >
        <div
          dir="rtl"
          lang="ar"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            color: "#ffffff",
            fontFamily,
            fontSize: 41,
            whiteSpace: "nowrap",
            transform: "rotate(-90deg)",
            transformOrigin: "right top",
          }}
        >
          {text}
        </div>
      </div>
    </AbsoluteFill>
  );
}