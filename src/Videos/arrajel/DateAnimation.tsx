import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { f } from "../../utils/constants";

// All frame numbers below are written for 30fps. f() converts them to the video fps.
const EASE_OUT = Easing.bezier(0.22, 1, 0.36, 1); // fast start, soft landing
const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1); // smooth start and end
const LOTTIE_EASE = Easing.bezier(0.12, 0, 0.12, 1); // easing taken from the Lottie file

const CLAMP = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

// Red square sits at x = 172..228, y = 371..427. The chip starts right after it.
const TILE_LEFT = 172;
const CHIP_LEFT = 228;
const TOP = 371;
const SIZE = 56;

// Both pieces start 220px to the left of where they rest
const SLIDE_DISTANCE = 220;

function CalendarIcon() {
  // Calendar drawn from the Lottie shapes (centered in the 56x56 square)
  const color = "#F4F4F2";
  const dayX = [-6.65, 0, 6.65];
  const dayY = [3.8, 9.975];

  return (
    <svg width={SIZE} height={SIZE} style={{ position: "absolute", inset: 0 }}>
      <g transform={`translate(${SIZE / 2} ${SIZE / 2})`}>
        {/* Calendar outline */}
        <rect
          x={-14.25}
          y={2.85 - 12.35}
          width={28.5}
          height={24.7}
          rx={2.85}
          fill="none"
          stroke={color}
          strokeWidth={3.04}
        />
        {/* Top band */}
        <rect
          x={-14.25}
          y={-6.175 - 3.325}
          width={28.5}
          height={6.65}
          rx={1}
          fill={color}
        />
        {/* Two binder rings */}
        <rect
          x={-7.125 - 1.6625}
          y={-11.4 - 3.8}
          width={3.325}
          height={7.6}
          rx={1}
          fill={color}
        />
        <rect
          x={7.125 - 1.6625}
          y={-11.4 - 3.8}
          width={3.325}
          height={7.6}
          rx={1}
          fill={color}
        />
        {/* Six days */}
        {dayY.flatMap((y) =>
          dayX.map((x) => (
            <rect
              key={`${x}-${y}`}
              x={x - 2.1375}
              y={y - 2.1375}
              width={4.275}
              height={4.275}
              fill={color}
            />
          )),
        )}
      </g>
    </svg>
  );
}

export default function DateAnimation({
  text,
  fontFamily,
}: {
  text: string;
  fontFamily: string;
}) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Frame counted back from the end of the sequence, so the exit works for any duration
  const fromEnd = (n: number) => durationInFrames - f(n);

  // Slides in from the left, then slides back out at the end
  const getSlideX = (exitStart: number, exitEnd: number, enterEnd: number) => {
    if (frame < fromEnd(exitStart)) {
      return interpolate(frame, [f(6), f(enterEnd)], [-SLIDE_DISTANCE, 0], {
        ...CLAMP,
        easing: EASE_OUT,
      });
    }
    return interpolate(
      frame,
      [fromEnd(exitStart), fromEnd(exitEnd)],
      [0, -SLIDE_DISTANCE],
      {
        ...CLAMP,
        easing: EASE_IN_OUT,
      },
    );
  };

  // Fades in at the start, fades out at the end
  const getOpacity = (fadeOutStart: number, fadeOutEnd: number) =>
    Math.min(
      interpolate(frame, [f(6), f(10.5)], [0, 1], CLAMP),
      interpolate(
        frame,
        [fromEnd(fadeOutStart), fromEnd(fadeOutEnd)],
        [1, 0],
        CLAMP,
      ),
    );

  const tileX = getSlideX(19.5, 4.5, 24);
  const tileOpacity = getOpacity(9, 4.5);

  const chipX = getSlideX(23, 7.5, 25.5);
  const chipOpacity = getOpacity(12, 7.5);

  // Dark box width: opens from left to right (0 = closed, 1 = fully open), closes at the end.
  // It is animated separately from the chip's translateX above.
  const boxOpen = Math.min(
    interpolate(frame, [f(11.4), f(26.4)], [0, 1], {
      ...CLAMP,
      easing: EASE_OUT,
    }),
    interpolate(frame, [fromEnd(27), fromEnd(12)], [1, 0], {
      ...CLAMP,
      easing: EASE_IN_OUT,
    }),
  );
  // Hides the right part of the chip while the box is still opening
  const boxClip = `inset(0 ${(1 - boxOpen) * 100}% 0 0)`;

  // Text hides again before the chip closes
  const textOut = interpolate(
    frame,
    [fromEnd(27), fromEnd(19.5)],
    [1, 0],
    CLAMP,
  );

  const words = text.split(" ").filter(Boolean);

  return (
    <AbsoluteFill>
      {/* Chip with the text (drawn first, so the red square covers it while sliding) */}
      <div
        style={{
          position: "absolute",
          top: TOP,
          left: CHIP_LEFT,
          opacity: chipOpacity,
          clipPath: boxClip,
          transform: `translateX(${chipX}px)`,
        }}
      >
        <div
          dir="rtl"
          style={{
            height: SIZE,
            lineHeight: `${SIZE}px`,
            padding: "0 20px",
            fontFamily,
            fontSize: 30,
            color: "#F4F4F2",
            whiteSpace: "nowrap",
            backgroundColor: "#1B1C1F",
            // Top-left and bottom-right corners are cut (10px)
            clipPath:
              "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
          }}
        >
          {words.map((word, i) => {
            // Each word starts 3 frames after the previous one and takes 15 frames
            const start = 15 + i * 3;
            const progress = Math.min(
              interpolate(frame, [f(start), f(start + 15)], [0, 1], {
                ...CLAMP,
                easing: LOTTIE_EASE,
              }),
              textOut,
            );

            return (
              <span key={i}>
                {i > 0 && " "}
                <span
                  style={{
                    display: "inline-block",
                    opacity: progress,
                    // Word rises 22px from below
                    transform: `translateY(${(1 - progress) * 22}px)`,
                  }}
                >
                  {word}
                </span>
              </span>
            );
          })}
        </div>
      </div>

      {/* Red square with the calendar icon */}
      <div
        style={{
          position: "absolute",
          top: TOP,
          left: TILE_LEFT,
          width: SIZE,
          height: SIZE,
          backgroundColor: "#9F1117",
          opacity: tileOpacity,
          transform: `translateX(${tileX}px)`,
        }}
      >
        <CalendarIcon />
      </div>
    </AbsoluteFill>
  );
}
