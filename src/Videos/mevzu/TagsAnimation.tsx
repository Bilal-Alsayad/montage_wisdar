import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

interface TagsAnimationProps {
  location?: string;
  date?: string;
  locationFontFamily: string;
  dateFontFamily: string;
}

export const TAGS_ANIMATION_DURATION = 200;

const getProgress = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.749, 0, 0.254, 1),
  });

const animatedText = (
  text: string,
  frame: number,
  start: number,
  end: number,
  offset: number,
) =>
  [...text].map((character, index) => {
    const progress = getProgress(
      frame,
      start + (index / Math.max(text.length, 1)) * (end - start),
      start + ((index + 1) / Math.max(text.length, 1)) * (end - start) + 3,
    );

    return (
      <span
        key={index}
        style={{
          display: "inline-block",
          whiteSpace: "pre",
          opacity: progress,
          transform: `translateY(${offset * (1 - progress)}px)`,
        }}
      >
        {character}
      </span>
    );
  });

export default function TagsAnimation({
  location,
  date,
  locationFontFamily,
  dateFontFamily,
}: TagsAnimationProps) {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        opacity: interpolate(frame, [190, 200], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      {location?.trim() && (
        <div
          style={{
            position: "absolute",
            top: 355,
            right: 180,
            height: 70,
            display: "inline-flex",
            alignItems: "center",
            padding: "0 12px 0 20px",
            gap: 12,
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#FFFFFF",
              transform: `scaleX(${getProgress(frame, 0, 40)})`,
              transformOrigin: "right center",
            }}
          />

          <span
            style={{
              position: "relative",
              color: "#000000",
              fontFamily: locationFontFamily,
              fontSize: 50,
              lineHeight: 1,
            }}
          >
            {animatedText(location, frame, 25, 65, -126)}
          </span>

          <Img
            src={staticFile("mevzu/images/location.svg")}
            style={{
              position: "relative",
              width: 64,
              height: 70,
              objectFit: "contain",
              transform: `scale(${getProgress(frame, 45, 85)})`,
            }}
          />
        </div>
      )}

      {date?.trim() && (
        <div
          style={{
            position: "absolute",
            top: 430,
            right: 180,
            height: 44,
            display: "inline-flex",
            alignItems: "center",
            padding: "0 12px",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#FFF704",
              transform: `scaleX(${getProgress(frame, 15, 55)})`,
              transformOrigin: "right center",
            }}
          />

          <span
            style={{
              position: "relative",
              color: "#000000",
              fontFamily: dateFontFamily,
              fontSize: 35,
              lineHeight: 1,
              fontWeight: 400,
            }}
          >
            {animatedText(date, frame, 35, 75, 75)}
          </span>
        </div>
      )}
    </div>
  );
}
