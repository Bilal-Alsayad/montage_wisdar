import { interpolate, useCurrentFrame } from "remotion";

type TagsAnimationProps = {
  text: string;
  fontFamily: string;
};

export const TAGS_ANIMATION_DURATION = 6;

export default function TagsAnimation({
  text,
  fontFamily,
}: TagsAnimationProps) {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, TAGS_ANIMATION_DURATION], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 65,
        top: 230,
        fontFamily,
        fontSize: 33,
        lineHeight: "36px",
        color: "#FFFFFF",
        opacity,
        backgroundColor: "transparent",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
}