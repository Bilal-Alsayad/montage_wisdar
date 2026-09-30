import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface TagsAnimationProps {
  location?: string;
  date?: string;
  source?: string;
  fontFamily: string;
}

export const TAGS_ANIMATION_DURATION = 300;

export default function TagsAnimation({
  location,
  date,
  source,
  fontFamily,
}: TagsAnimationProps) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sourceFrame = frame * (25 / fps);
  const animationFrame =
    sourceFrame < 215 ? sourceFrame : Math.max(0, 250 - sourceFrame);

  const move = (start: number, end: number, from: number) =>
    interpolate(animationFrame, [start, end], [from, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.901, 0.005, 0.252, 1),
    });

  const opacity = interpolate(sourceFrame, [215, 250], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const row = (
    text: string | undefined,
    top: number,
    start: number,
    end: number,
    from: number,
    color: string,
    icon: string,
  ) =>
    text?.trim() ? (
      <div
        style={{
          position: "absolute",
          top,
          left: -1,
          height: 55,
          display: "inline-flex",
          alignItems: "center",
          gap: 24,
          padding: "0 55px 0 40px",
          backgroundColor: color,
          color: "#FFFFFF",
          fontFamily,
          fontSize: 38,
          lineHeight: "46px",
          whiteSpace: "nowrap",
          opacity,
          transform: `translateX(${move(start, end, from)}px)`,
        }}
      >
        <span>{text}</span>
        <Img
          src={staticFile(`saha/images/${icon}`)}
          style={{
            width: 50,
            height: 50,
          }}
        />
      </div>
    ) : null;

  return (
    <>
      {row(location, 124, 0, 28, -689, "#C0856E", "location.svg")}
      {row(date, 184, 5, 32, -716, "#925842", "date.svg")}

      {source?.trim() && (
        <div
          style={{
            position: "absolute",
            top: 250,
            left: 30,
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            color: "#FFFFFF",
            fontFamily,
            fontSize: 36,
            lineHeight: "44px",
            whiteSpace: "nowrap",
            opacity,
            transform: `translateX(${move(8, 35, -716)}px)`,
          }}
        >
          <Img
            src={staticFile("saha/images/source.svg")}
            style={{
              width: 50,
              height: 50,
            }}
          />
          <span>{source}</span>
        </div>
      )}
    </>
  );
}
