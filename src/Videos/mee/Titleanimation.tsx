import {
  Easing,
  interpolate,
  interpolateColors,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
//fittext :(

export const TITLE_ANIMATION_DURATION = 90;

interface TitleAnimationProps {
  text?: string;
  fontFamily: string;
}

type Point = readonly [number, number];

const COMP_WIDTH = 1080;
const COMP_HEIGHT = 1920;
const COMP_CENTER_Y = COMP_HEIGHT / 2;
const SOURCE_TIMELINE_END = 119;
const WHITE_RECTANGLES_DURATION = 12;

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const STANDARD_EASING = Easing.bezier(
  0.167,
  0.167,
  0.833,
  0.833,
);

const MASK_EASING = Easing.bezier(
  0.167,
  0.167,
  0,
  1,
);

const TEXT_POSITION_EASING = Easing.bezier(
  0.072,
  0.503,
  0.288,
  1,
);

const LINE_SPACING_EASING = Easing.bezier(
  0.245,
  0.972,
  0.426,
  1,
);

const TEXT_REVEAL_EASING = Easing.bezier(
  0.186,
  0.808,
  0.667,
  1,
);

const TEXT_EXIT_EASING = Easing.bezier(
  0.465,
  0.528,
  0.676,
  0.729,
);

const mixPoints = (progress: number): Point[] => [
  [
    -1796.281 + (-56.429 - -1796.281) * progress,
    965.657 + (1948.8 - 965.657) * progress,
  ],
  [
    2579.296 + (1113.01 - 2579.296) * progress,
    957.172 + (1957.774 - 957.172) * progress,
  ],
  [
    2584.951 + (1111.153 - 2584.951) * progress,
    957.17 + (-6.742 - 957.17) * progress,
  ],
  [
    -1790.623 + (-10.971 - -1790.623) * progress,
    959.999 + (-9.886 - 959.999) * progress,
  ],
];

const polygonPoints = (points: readonly Point[]) =>
  points
    .map(([x, y]) => `${x.toFixed(3)},${y.toFixed(3)}`)
    .join(" ");

const invertedPolygonPath = (
  points: readonly Point[],
) => {
  const innerPath = points
    .map(
      ([x, y], index) =>
        `${index === 0 ? "M" : "L"} ${x} ${y}`,
    )
    .join(" ");

  return `
    M 0 0
    H ${COMP_WIDTH}
    V ${COMP_HEIGHT}
    H 0
    Z
    ${innerPath}
    Z
  `;
};

const createEnterMask = (progress: number) => {
  if (progress <= 0) {
    return "linear-gradient(transparent, transparent)";
  }

  if (progress >= 1) {
    return "linear-gradient(#000, #000)";
  }

  const edge = progress * 251;

  return `linear-gradient(
    to bottom,
    #000 0px,
    #000 ${Math.max(0, edge - 30)}px,
    transparent ${Math.min(251, edge + 30)}px,
    transparent 100%
  )`;
};

const createExitMask = (progress: number) => {
  if (progress <= 0) {
    return "linear-gradient(#000, #000)";
  }

  if (progress >= 1) {
    return "linear-gradient(transparent, transparent)";
  }

  const edge = progress * 251;

  return `linear-gradient(
    to bottom,
    transparent 0px,
    transparent ${Math.max(0, edge - 30)}px,
    #000 ${Math.min(251, edge + 30)}px,
    #000 100%
  )`;
};

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const title = text?.trim().toUpperCase();

  if (!title) return null;

  const timelineFrame = interpolate(
    frame,
    [0, durationInFrames - 1],
    [0, SOURCE_TIMELINE_END],
    CLAMP,
  );

  const whiteRectanglesScaleY = interpolate(
    timelineFrame,
    [0, WHITE_RECTANGLES_DURATION],
    [1 / COMP_HEIGHT, 1],
    {
      ...CLAMP,
      easing: STANDARD_EASING,
    },
  );

  const animationFrame = Math.max(
    0,
    timelineFrame - WHITE_RECTANGLES_DURATION,
  );

  const backgroundOpacity = interpolate(
    timelineFrame,
    [104, SOURCE_TIMELINE_END],
    [1, 0],
    {
      ...CLAMP,
      easing: STANDARD_EASING,
    },
  );

  const whiteMaskProgress = interpolate(
    animationFrame,
    [0, 37.2],
    [0, 1],
    {
      ...CLAMP,
      easing: MASK_EASING,
    },
  );

  const darkMaskProgress = interpolate(
    animationFrame,
    [0, 46.8],
    [0, 1],
    {
      ...CLAMP,
      easing: MASK_EASING,
    },
  );

  const textY = interpolate(
    animationFrame,
    [13.206, 43.236],
    [147.4192, 0],
    {
      ...CLAMP,
      easing: TEXT_POSITION_EASING,
    },
  );

  const lineSpacing = interpolate(
    animationFrame,
    [13.206, 43.236],
    [50.4, -3.2],
    {
      ...CLAMP,
      easing: LINE_SPACING_EASING,
    },
  );

  const enterReveal = interpolate(
    animationFrame,
    [13.206, 43.236],
    [0, 1],
    {
      ...CLAMP,
      easing: TEXT_REVEAL_EASING,
    },
  );

  const exitReveal = interpolate(
    animationFrame,
    [70.7988, 91.2],
    [0, 1],
    {
      ...CLAMP,
      easing: TEXT_EXIT_EASING,
    },
  );

  const colorProgress = interpolate(
    animationFrame,
    [2.4, 19.9176],
    [0, 1],
    {
      ...CLAMP,
      easing: STANDARD_EASING,
    },
  );

  const whiteMaskPoints = mixPoints(
    whiteMaskProgress,
  );

  const darkMaskPoints = mixPoints(
    darkMaskProgress,
  );

  const words = title.split(/\s+/);

  const orangeStartIndex = Math.round(
    words.length * 0.45,
  );

  const orangeWordCount = Math.max(
    1,
    words.length - orangeStartIndex,
  );

  const titleScale =
    title.length > 58
      ? 56 / 88
      : title.length > 38
        ? 68 / 88
        : 1;

  const titleFontSize = 88 * titleScale;

  const titleLineHeight =
    (105.6 + lineSpacing) * titleScale;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: COMP_WIDTH,
        height: COMP_HEIGHT,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Arka plan katmanları */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: COMP_WIDTH,
          height: COMP_HEIGHT,
          opacity: backgroundOpacity,
        }}
      >
        <svg
          width={COMP_WIDTH}
          height={COMP_HEIGHT}
          viewBox={`0 0 ${COMP_WIDTH} ${COMP_HEIGHT}`}
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          <g
            transform={`
              translate(
                0
                ${
                  COMP_CENTER_Y *
                  (1 - whiteRectanglesScaleY)
                }
              )
              scale(1 ${whiteRectanglesScaleY})
            `}
          >
            <path
              d={invertedPolygonPath(
                whiteMaskPoints,
              )}
              fill="#FFFFFF"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </g>

          <polygon
            points={polygonPoints(
              darkMaskPoints,
            )}
            fill="#000000"
            fillOpacity={0.5}
          />
        </svg>
      </div>

      {/* Başlık katmanı */}
      <div
        style={{
          position: "absolute",
          left: 137,
          top: 876,
          width: 813,
          height: 251,
          transform: `translateY(${textY}px)`,

          maskImage:
            createEnterMask(enterReveal),

          WebkitMaskImage:
            createEnterMask(enterReveal),

          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",

            maskImage:
              createExitMask(exitReveal),

            WebkitMaskImage:
              createExitMask(exitReveal),

            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <div
            style={{
              width: "100%",
              fontFamily,
              fontSize: titleFontSize,
              lineHeight: `${titleLineHeight}px`,
              color: "#FFFFFF",
              textAlign: "center",
              textTransform: "uppercase",
              whiteSpace: "normal",
              overflowWrap: "break-word",
              wordBreak: "normal",

              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
            }}
          >
            {words.map((word, index) => {
              const isOrange =
                index >= orangeStartIndex;

              const orangeIndex =
                index - orangeStartIndex;

              const stagger =
                orangeWordCount <= 1
                  ? 0
                  : (orangeIndex /
                      (orangeWordCount - 1)) *
                    0.18;

              const wordColorProgress = isOrange
                ? interpolate(
                    colorProgress,
                    [
                      stagger,
                      Math.min(
                        1,
                        stagger + 0.82,
                      ),
                    ],
                    [0, 1],
                    CLAMP,
                  )
                : 0;

              const color = isOrange
                ? interpolateColors(
                    wordColorProgress,
                    [0, 1],
                    [
                      "#FFFFFF",
                      "#FF9600",
                    ],
                  )
                : "#FFFFFF";

              return (
                <span
                  key={`${word}-${index}`}
                  style={{ color }}
                >
                  {word}
                  {index < words.length - 1
                    ? " "
                    : ""}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}