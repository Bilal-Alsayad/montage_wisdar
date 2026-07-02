import { Easing, interpolate, useCurrentFrame } from "remotion";

export const TAGS_ANIMATION_DURATION = 99;

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const TAGS_EASING = Easing.bezier(0.167, 0.167, 0.833, 0.833);

const ENTER_START = 1;
const ENTER_END = 6;
const EXIT_START = 92;
const EXIT_END = 99;

interface TagsAnimationProps {
  location?: string;
  date?: string;
  fontFamily: string;
}

export default function TagsAnimation({
  location,
  date,
  fontFamily,
}: TagsAnimationProps) {
  const frame = useCurrentFrame();

  const enter = interpolate(frame, [ENTER_START, ENTER_END], [0, 1], {
    ...CLAMP,
    easing: TAGS_EASING,
  });
  const exit = interpolate(frame, [EXIT_START, EXIT_END], [1, 0], {
    ...CLAMP,
    easing: TAGS_EASING,
  });
  const opacity = Math.min(enter, exit);

  return (
    <>
      {location ? (
        <div
          style={{
            position: "absolute",
            left: 90,
            top: 480,
            fontFamily,
            fontSize: 50,
            color: "white",
            lineHeight: 1,
            opacity,
          }}
        >
          {location}
        </div>
      ) : null}

      {date ? (
        <div
          style={{
            position: "absolute",
            left: 90,
            top: 530,
            fontFamily,
            fontSize: 50,
            color: "white",
            lineHeight: 1,
            opacity,
          }}
        >
          {date}
        </div>
      ) : null}
    </>
  );
}