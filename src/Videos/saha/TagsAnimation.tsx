import {
  Easing,
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
  const {fps} = useVideoConfig();
  const opacity = interpolate(frame, [165, 199], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const move = (start: number, end: number, distance: number) =>
    -interpolate(
      frame < 165
        ? (frame * 25) / fps
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

    const maskId = `${icon}-cutout`;

    return (
      <div
        style={{
          position: "absolute",
          top,
          left: 0,
          display: "inline-flex",
          fontFamily,
          fontSize: 38,
          color: "#FFFFFF",
          whiteSpace: "nowrap",
          opacity,
          transform: `translateX(${move(start, end, distance)}px)`,
        }}
      >
        <div
          style={{
            height: 55,
            display: "flex",
            alignItems: "center",
            padding: "0 20px 0 56px",
            backgroundColor: color,
          }}
        >
          {text}
        </div>

        <svg width={55} height={55}>
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse">
              <rect width={55} height={55} fill="white" />
              <image
                href={staticFile(`saha/images/${icon}`)}
                x={5}
                y={5}
                width={45}
                height={45}
                style={{filter: "brightness(0)"}}
              />
            </mask>
          </defs>
          <rect width={55} height={55} fill="white" mask={`url(#${maskId})`} />
        </svg>
      </div>
    );
  };

  const sourceText = source?.trim();
  const sourceWidth = 80 + Math.ceil((sourceText?.length ?? 0) * 20.5);

  return (
    <>
      {row(location, 224, 0, 28, 689, "#C0856E", "location.svg")}
      {row(date, 284, 5, 32, 716, "#925842", "date.svg")}

      {sourceText && (
        <svg
          width={sourceWidth}
          height={55}
          style={{
            position: "absolute",
            top: 344,
            left: 0,
            opacity,
            transform: `translateX(${move(8, 35, 716)}px)`,
          }}
        >
          <defs>
            <mask id="source-cutout" maskUnits="userSpaceOnUse">
              <rect width={sourceWidth} height={55} fill="white" />
              <text
                x={56}
                y={41}
                fill="black"
                fontFamily={fontFamily}
                fontSize={36}
              >
                {sourceText}
              </text>
            </mask>
          </defs>
          <rect
            width={sourceWidth}
            height={55}
            fill="white"
            mask="url(#source-cutout)"
          />
        </svg>
      )}
    </>
  );
}
