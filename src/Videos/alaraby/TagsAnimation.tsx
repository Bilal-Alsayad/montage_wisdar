import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  interpolateColors,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";

interface TagsAnimationProps {
  location: string;
  date: string;
  source: string;
  fontFamily: string;
}

interface TagProps {
  text: string;
  icon: string;
  top: number;
  fontFamily: string;
}

const TAG_DURATION = 116;
const RED = "#cc2e2e";
const EASE = Easing.bezier(0.33, 0, 0.2, 1);

export const TAGS_ANIMATION_DURATION = 232;

function Tag({text, icon, top, fontFamily}: TagProps) {
  const frame = useCurrentFrame();

  if (!text) {
    return null;
  }

  const animationFrame = Math.max(
    0,
    Math.min(frame, TAG_DURATION - frame, 25),
  );

  return (
    <div
      dir="rtl"
      style={{
        position: "absolute",
        top,
        right: 102,
        height: 55,
        opacity: interpolate(animationFrame, [0, 7], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: interpolate(animationFrame, [5, 20], [19, 55], {
            easing: EASE,
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          height: 55,
          width: "max-content",
          padding: "0 30px",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          whiteSpace: "nowrap",
          backgroundColor: interpolateColors(
            animationFrame,
            [5, 16],
            [RED, "#ffffff"],
          ),
          color: interpolateColors(
            animationFrame,
            [7, 13, 14],
            ["#dedede", "#ffffff", RED],
          ),
          fontFamily,
          fontSize: 30,
          transform: `scaleX(${interpolate(
            animationFrame,
            [5, 19],
            [0, 1],
            {
              easing: EASE,
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          )})`,
          transformOrigin: "right center",
        }}
      >
        <span
          style={{
            clipPath: `inset(0 0 0 ${
              100 -
              interpolate(animationFrame, [7, 25], [0, 100], {
                easing: EASE,
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            }%)`,
          }}
        >
          {text}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          right: interpolate(animationFrame, [0, 19], [-68, 0], {
            easing: EASE,
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          width: 55,
          height: 55,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: interpolateColors(
            animationFrame,
            [0, 10, 17, 18],
            ["#ffffff", "#ffffff", "#171717", RED],
          ),
          transform: `scaleX(${interpolate(
            animationFrame,
            [0, 12],
            [0.16, 1],
            {
              easing: EASE,
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          )})`,
          transformOrigin: "right center",
        }}
      >
        <Img
          src={staticFile(`alaraby/images/${icon}`)}
          style={{
            width: 34,
            height: 45,
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
}

export default function TagsAnimation({
  location,
  date,
  source,
  fontFamily,
}: TagsAnimationProps) {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={TAG_DURATION}>
        <Tag
          text={location}
          icon="location.png"
          top={298}
          fontFamily={fontFamily}
        />

        <Tag
          text={date}
          icon="date.png"
          top={363}
          fontFamily={fontFamily}
        />
      </Sequence>

      <Sequence from={TAG_DURATION} durationInFrames={TAG_DURATION}>
        <Tag
          text={source}
          icon="source.png"
          top={298}
          fontFamily={fontFamily}
        />
      </Sequence>
    </AbsoluteFill>
  );
}
