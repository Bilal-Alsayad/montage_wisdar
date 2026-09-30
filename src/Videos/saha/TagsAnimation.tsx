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

export const TAGS_ANIMATION_DURATION = 200;

export default function TagsAnimation({
  location,
  date,
  source,
  fontFamily,
}: TagsAnimationProps) {
  const frame = useCurrentFrame();
  const sourceFrame = frame * (25 / useVideoConfig().fps);

  const move = (
    start: number,
    end: number,
    distance: number
  ) =>
    -interpolate(
      frame < 165
        ? sourceFrame
        : interpolate(frame, [165, 200], [35, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
      [start, end],
      [distance, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.901, 0.005, 0.252, 1),
      }
    );

  const row = (
    text: string | undefined,
    top: number,
    start: number,
    end: number,
    distance: number,
    color: string,
    icon: string
  ) => {
    if (!text?.trim()) return null;

    return (
      <div
        style={{
          position: "absolute",
          top,
          height: 55,
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "0 6px 0 30px",
          backgroundColor: color,
          color: "#FFFFFF",
          fontFamily,
          fontSize: 38,
          lineHeight: "55px",
          whiteSpace: "nowrap",
          opacity: interpolate(frame, [165, 199], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `translateX(${move(start, end, distance)}px)`,
        }}
      >
        <span>{text}</span>

        <Img
          src={staticFile(`saha/images/${icon}`)}
          style={{
            width: 50,
            height: 50,
            objectFit: "contain",
          }}
        />
      </div>
    );
  };

  return (
    <>
      {row(
        location,
        224,
        0,
        28,
        689,
        "#C0856E",
        "location.svg"
      )}

      {row(
        date,
        284,
        5,
        32,
        716,
        "#925842",
        "date.svg"
      )}

      {source?.trim() && (
        <div
          style={{
            position: "absolute",
            top: 350,
            left: 30,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            color: "#FFFFFF",
            fontFamily,
            fontSize: 36,
            lineHeight: "50px",
            whiteSpace: "nowrap",
            opacity: interpolate(frame, [165, 199], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateX(${move(8, 35, 716)}px)`,
          }}
        >
          <Img
            src={staticFile("saha/images/source.svg")}
            style={{
              width: 50,
              height: 50,
              objectFit: "contain",
            }}
          />

          <span>{source}</span>
        </div>
      )}
    </>
  );
}