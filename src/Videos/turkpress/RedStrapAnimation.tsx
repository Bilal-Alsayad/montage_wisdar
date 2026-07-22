import {useId} from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  interpolateColors,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {measureText} from "@remotion/layout-utils";

type Points = readonly number[];

type CommonRedStrapProps = {
  text: string;
  fontFamily: string;
  top: number;
  width?: number;
  minWidth?: number;
  fontSize?: number;
  horizontalPadding?: number;
  boxColor?: string;
  textColor?: string;
  showTail?: boolean;
};

export type RedStrapAnimationProps = CommonRedStrapProps &
  (
    | {
        expandDirection?: "right";
        left: number;
        right?: never;
      }
    | {
        expandDirection: "left";
        right: number;
        left?: never;
      }
  );

export const RED_STRAP_ANIMATION_DURATION = 30;
export const RED_STRAP_BASE_WIDTH = 313.5;
export const RED_STRAP_HEIGHT = 83.5;

const EASE = Easing.bezier(0.333, 0, 0.667, 1);
const TEXT_EASE = Easing.bezier(0.167, 0.167, 0.833, 0.833);

const FRONT_TIMES = [4, 5, 8, 12, 16];

const FRONT_FRAMES: Points[] = [
  [
    1031.5, 286.8, 1030.7, 304.9, 1023.3, 320.9, 1009.5, 332.2, 992.4,
    336.9, 973.3, 336.9, 954.2, 336.9, 935.5, 336.1, 916.4, 336.1,
    897.7, 335.2, 880.1, 331.7, 869.8, 317.9, 862.1, 302, 854.5, 286.1,
    847.1, 270.1, 839.6, 254.1, 832.3, 238.1, 837, 221.4, 847.3, 206.5,
    860.3, 194.3, 876.1, 200.6, 890.3, 212.2, 904.6, 223.9, 918.8,
    235.5, 929, 246.2, 916.4, 254.7, 935.4, 254.8, 954.4, 254.8, 973.5,
    254.8, 992.6, 254.8, 1009.8, 259.2, 1023.7, 271,
  ],
  [
    1031.5, 285.1, 1031.5, 304.2, 1023.5, 320.7, 1008.8, 331.9, 991.1,
    336.9, 971.3, 336.9, 951.4, 336.9, 932, 336.1, 912.2, 336.1, 892.7,
    336.9, 873.2, 336.1, 853.8, 335.2, 836.6, 328.8, 828.1, 312.5, 820.2,
    295.9, 812.3, 279.4, 804.2, 262.9, 797.1, 246, 792.9, 228.6, 806.1,
    220.5, 820.5, 232.3, 835.1, 245.1, 851.9, 252.2, 871.4, 253.1, 891.2,
    253.1, 911, 253.1, 930.8, 253.1, 950.7, 253.1, 970.5, 253.1, 990.3,
    253.1, 1008.3, 257.4, 1022.9, 268.8,
  ],
  [
    1032.3, 291.1, 1029.5, 311.2, 1017.3, 326.9, 999.4, 335.2, 978.8,
    336.9, 957.6, 336.9, 936.3, 336.9, 915, 336.9, 893.7, 336.9, 872.8,
    336.1, 851.6, 336.2, 830.9, 336.1, 810, 335.2, 793.2, 326.9, 783.7,
    309.5, 775.3, 291.7, 766.4, 274.1, 757.5, 256.5, 760.4, 247.9, 780.3,
    251.4, 801.2, 252.2, 822.5, 252.2, 843.7, 252.2, 865, 252.2, 886.3,
    252.2, 907.2, 253.1, 928.5, 253.1, 949.8, 253.1, 971.1, 253.1, 992.3,
    253.1, 1011.5, 258.3, 1026.3, 272.4,
  ],
  [
    1032.3, 294.6, 1027.1, 315.5, 1011.9, 330.9, 991.4, 336.9, 968.4,
    336.9, 945.3, 336.9, 922.3, 336.9, 899.3, 336.9, 876.6, 336.1, 853.6,
    336.1, 830.5, 336.1, 807.5, 336.1, 785.2, 336.1, 762.9, 334.3, 744.5,
    324.6, 736, 305.1, 729.8, 284.6, 724.7, 263.7, 737.9, 251.4, 760.6,
    252.2, 783.6, 252.2, 806.6, 252.2, 829.7, 252.2, 852.7, 252.2, 875.7,
    252.2, 898.8, 252.2, 921.4, 253.1, 944.5, 253.1, 967.5, 253.1, 990.5,
    253.1, 1011.4, 258.3, 1027, 273.7,
  ],
  [
    1031.5, 287, 1023.2, 307.8, 1005.2, 321.5, 981.9, 324, 957.7, 324,
    933.4, 324, 909.1, 324, 884.9, 324, 860.6, 324, 836.3, 324, 812.3,
    323.5, 788, 323.5, 763.7, 323.5, 739.5, 323.5, 718.8, 330.7, 718,
    311.4, 718, 287.1, 718, 262.8, 724.6, 241.9, 748.3, 240.5, 772.6,
    240.5, 796.6, 241, 820.9, 241, 845.2, 241, 869.4, 241, 893.7, 241,
    918, 241, 942.2, 241, 966.5, 241, 990.8, 241, 1012.3, 247.5, 1027.7,
    264.7,
  ],
];

const BACK_8: Points = [
  794.7, 330, 785.4, 330, 774.1, 330.9, 762.4, 330.9, 751, 330, 740.6,
  326.9, 731.6, 320.5, 725.5, 311.3, 722.9, 300.7, 724.5, 289.6, 729,
  279.8, 736.3, 272.6, 746.3, 268.6, 757.3, 266.9, 764.4, 272.3, 769.2,
  282.1, 773.9, 291.8, 778.4, 301.7, 783.4, 311.3, 788.2, 321,
];

const BACK_12: Points = [
  750.6, 331.8, 746.2, 329.9, 742.5, 324.6, 739.4, 319.5, 737.6, 313.3,
  735, 307.5, 733, 302, 730.5, 296.1, 729, 289.9, 727.3, 283.7, 726.3,
  282.6, 723.8, 288.4, 722.1, 294.6, 722.1, 301.5, 722.9, 308, 725, 314,
  728.1, 319.6, 733, 324.5, 738.3, 328.1, 744.2, 330.6,
];

const BACK_START: Points = BACK_8.map((_, index) => {
  const progress = Math.floor(index / 2) / (BACK_8.length / 2 - 1);

  return index % 2 === 0
    ? 760.4 + (793.2 - 760.4) * progress
    : 247.9 + (326.9 - 247.9) * progress;
});

const BACK_END: Points = BACK_12.map((_, index) => {
  const progress = Math.floor(index / 2) / (BACK_12.length / 2 - 1);

  return index % 2 === 0
    ? 718
    : 262.8 + (330.7 - 262.8) * progress;
});

const BACK_FRAMES: Points[] = [
  BACK_START,
  BACK_8,
  BACK_12,
  BACK_END,
];

const CREASE_FRAMES: Points[] = [
  [
    832.3, 238.1, 929, 246.2, 916.4, 254.7, 880.1, 331.7, 869.8, 317.9,
    839.6, 254.1,
  ],
  [
    792.9, 228.6, 851.9, 252.2, 842, 258, 836.6, 328.8, 828.1, 312.5,
    797.1, 246,
  ],
  [
    757.5, 247.9, 766.4, 251, 810, 335.2, 793.2, 326.9, 783.7, 309.5,
    757.5, 256.5,
  ],
  [
    724.7, 251.4, 731, 253, 762.9, 334.3, 744.5, 324.6, 736, 305.1, 729.8,
    284.6,
  ],
  [
    718, 262.8, 718, 262.8, 718, 330.7, 718, 330.7, 718, 311.4, 718, 287.1,
  ],
];

const flatToPairs = (flat: readonly number[]) => {
  const pairs: number[][] = [];

  for (let i = 0; i < flat.length; i += 2) {
    pairs.push([flat[i], flat[i + 1]]);
  }

  return pairs;
};

const smoothClosedPath = (flat: readonly number[]) => {
  const points = flatToPairs(flat);

  if (points.length < 3) {
    return "";
  }

  let path = `M ${points[0][0]} ${points[0][1]} `;

  for (let i = 0; i < points.length; i++) {
    const previous = points[(i - 1 + points.length) % points.length];
    const current = points[i];
    const next = points[(i + 1) % points.length];
    const afterNext = points[(i + 2) % points.length];

    path += `C ${
      current[0] + (next[0] - previous[0]) / 6
    } ${
      current[1] + (next[1] - previous[1]) / 6
    } ${
      next[0] - (afterNext[0] - current[0]) / 6
    } ${
      next[1] - (afterNext[1] - current[1]) / 6
    } ${next[0]} ${next[1]} `;
  }

  return `${path}Z`;
};

const straightPath = (flat: readonly number[]) => {
  const points = flatToPairs(flat);

  if (!points.length) {
    return "";
  }

  return (
    `M ${points[0][0]} ${points[0][1]} ` +
    points
      .slice(1)
      .map(([x, y]) => `L ${x} ${y}`)
      .join(" ") +
    " Z"
  );
};

const morphPath = (
  frame: number,
  times: readonly number[],
  frames: readonly Points[],
  smooth = true,
) => {
  const buildPath = smooth ? smoothClosedPath : straightPath;

  if (frame <= times[0]) {
    return buildPath(frames[0]);
  }

  const last = times.length - 1;

  if (frame >= times[last]) {
    return buildPath(frames[last]);
  }

  const section = times.findIndex((time) => frame < time) - 1;

  const progress = EASE(
    (frame - times[section]) /
      (times[section + 1] - times[section]),
  );

  return buildPath(
    frames[section].map(
      (value, index) =>
        value +
        (frames[section + 1][index] - value) * progress,
    ),
  );
};

const BASE_BOX_LEFT = 718;
const BASE_BOX_TOP = 240.5;

const PIVOT_LEFT = 890;
const PIVOT_RIGHT = 1010;

const stretchX = (x: number, deltaX: number) => {
  if (deltaX <= 0 || x <= PIVOT_LEFT) {
    return x;
  }

  if (x >= PIVOT_RIGHT) {
    return x + deltaX;
  }

  return (
    x +
    deltaX *
      ((x - PIVOT_LEFT) / (PIVOT_RIGHT - PIVOT_LEFT))
  );
};

const stretchPoints = (
  points: readonly number[],
  deltaX: number,
) =>
  points.map((value, index) =>
    index % 2 === 0
      ? stretchX(value, deltaX)
      : value,
  );

export default function RedStrapAnimation(
  props: RedStrapAnimationProps,
) {
  const {
    text,
    fontFamily,
    top,
    width: requestedWidth,
    minWidth = RED_STRAP_BASE_WIDTH,
    fontSize = 33,
    horizontalPadding = 80,
    boxColor = "#DD2229",
    textColor = "#FAE6D7",
    showTail = true,
  } = props;

  const frame = useCurrentFrame();

  const {
    fps,
    width: compositionWidth,
  } = useVideoConfig();

  const id = useId().replace(/:/g, "");
  const sourceFrame = (frame * 25) / fps;

  if (!text) {
    return null;
  }

  const textWidth = measureText({
    text,
    fontFamily,
    fontSize,
  }).width;

  const boxWidth = Math.max(
    RED_STRAP_BASE_WIDTH,
    minWidth,
    textWidth + horizontalPadding,
    requestedWidth ?? 0,
  );

  const deltaX = boxWidth - RED_STRAP_BASE_WIDTH;

  const frontFrames = FRONT_FRAMES.map((points) =>
    stretchPoints(points, deltaX),
  );

  const backFrames = BACK_FRAMES.map((points) =>
    stretchPoints(points, deltaX),
  );

  const creaseFrames = CREASE_FRAMES.map((points) =>
    stretchPoints(points, deltaX),
  );

  const strapOpacity = interpolate(
    sourceFrame,
    [3, 6],
    [0, 1],
    {
      easing: EASE,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const backOpacity = interpolate(
    sourceFrame,
    [6, 8, 12, 16],
    [0, 0.85, 0.85, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const creaseOpacity = interpolate(
    sourceFrame,
    [4, 5, 8, 12, 16],
    [0.13, 0.12, 0.16, 0.08, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const textReveal = interpolate(
    sourceFrame,
    [3, 22],
    [0, 1],
    {
      easing: TEXT_EASE,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const strapY = interpolate(
    sourceFrame,
    [4, 12, 16],
    [-12.9, -12.9, 0],
    {
      easing: EASE,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const finalShapeOpacity = interpolate(
    sourceFrame,
    [15, 16],
    [0, 1],
    {
      easing: EASE,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const groupX =
    props.expandDirection === "left"
      ? compositionWidth -
        props.right -
        (BASE_BOX_LEFT + boxWidth)
      : props.left - BASE_BOX_LEFT;

  const groupY = top - BASE_BOX_TOP;

  const boxRight = BASE_BOX_LEFT + boxWidth;
  const boxCenter = BASE_BOX_LEFT + boxWidth / 2;

  const finalRight = 1031.5 + deltaX;
  const finalCurveStart = 990.8 + deltaX;

  const finalStrapPath = `
    M 734 240.5
    H ${finalCurveStart}

    C ${1013.3 + deltaX} 240.5
      ${finalRight} 259
      ${finalRight} 282.25

    C ${finalRight} 305.5
      ${1013.3 + deltaX} 324
      ${finalCurveStart} 324

    H 718
    V 255

    C 718 247
      724.5 240.5
      734 240.5

    Z
  `;

  return (
    <AbsoluteFill>
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <defs>
          <clipPath
            id={`${id}-text`}
            clipPathUnits="userSpaceOnUse"
          >
            <rect
              x={interpolate(
                textReveal,
                [0, 1],
                [boxRight, BASE_BOX_LEFT],
              )}
              y="240"
              width={interpolate(
                textReveal,
                [0, 1],
                [0, boxWidth],
              )}
              height="105"
            />
          </clipPath>

          <filter
            id={`${id}-crease`}
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        <g transform={`translate(${groupX} ${groupY})`}>
          <g opacity={strapOpacity}>
            <g
              opacity={1 - finalShapeOpacity}
              transform={`translate(0 ${strapY})`}
            >
              <path
                d={morphPath(
                  sourceFrame,
                  [6, 8, 12, 16],
                  backFrames,
                )}
                fill={interpolateColors(
                  sourceFrame,
                  [6, 8, 12, 16],
                  [
                    "#3B3532",
                    "#292725",
                    "#786F69",
                    "#C4C4B4",
                  ],
                )}
                opacity={backOpacity}
              />

              <path
                d={morphPath(
                  sourceFrame,
                  FRONT_TIMES,
                  frontFrames,
                )}
                fill={boxColor}
                stroke={boxColor}
                strokeWidth="1.5"
                strokeLinejoin="round"
              />

              <path
                d={morphPath(
                  sourceFrame,
                  FRONT_TIMES,
                  creaseFrames,
                  false,
                )}
                fill="#000"
                opacity={creaseOpacity * 0.45}
                filter={`url(#${id}-crease)`}
              />

              <path
                d={morphPath(
                  sourceFrame,
                  FRONT_TIMES,
                  creaseFrames,
                  false,
                )}
                fill="#000"
                opacity={creaseOpacity}
              />
            </g>

            <path
              d={finalStrapPath}
              fill={boxColor}
              opacity={finalShapeOpacity}
            />

            {showTail && (
              <path
                d="M 718 323 L 718 355 L 750 323 Z"
                fill={boxColor}
                opacity={finalShapeOpacity}
              />
            )}
          </g>

          <text
            x={boxCenter}
            y="291.836"
            fill={textColor}
            fontFamily={fontFamily}
            fontSize={fontSize}
            textAnchor="middle"
            clipPath={`url(#${id}-text)`}
            style={{
              direction: "rtl",
              unicodeBidi: "plaintext",
            }}
          >
            {text}
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
}