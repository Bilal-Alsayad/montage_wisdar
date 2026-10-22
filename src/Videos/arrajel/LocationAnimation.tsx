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

// Red square sits at x = 172..228, y = 297..353. The chip starts right after it.
const TILE_LEFT = 172;
const CHIP_LEFT = 228;
const TOP = 297;
const SIZE = 56;

// Both pieces start 220px to the left of where they rest
const SLIDE_DISTANCE = 220;

function Pin() {
  // Pin shape: circle + triangle, with a small red hole in the middle
  return (
    <svg width={SIZE} height={SIZE} style={{ position: "absolute", inset: 0 }}>
      <g transform={`translate(${SIZE / 2} ${SIZE / 2})`}>
        <circle cx={0} cy={-6} r={13} fill="#F4F4F2" />
        <polygon points="-10.5,0 10.5,0 0,17" fill="#F4F4F2" />
        <circle cx={0} cy={-6} r={5} fill="#9F1117" />
      </g>
    </svg>
  );
}

export default function LocationAnimation({
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
      return interpolate(frame, [f(3), f(enterEnd)], [-SLIDE_DISTANCE, 0], {
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
      interpolate(frame, [f(3), f(7.5)], [0, 1], CLAMP),
      interpolate(
        frame,
        [fromEnd(fadeOutStart), fromEnd(fadeOutEnd)],
        [1, 0],
        CLAMP,
      ),
    );

  const tileX = getSlideX(21, 6, 21);
  const tileOpacity = getOpacity(10.5, 6);

  const chipX = getSlideX(25, 9, 22.5);
  const chipOpacity = getOpacity(13.5, 9);

  // Dark box width: opens from left to right (0 = closed, 1 = fully open), closes at the end.
  // It is animated separately from the chip's translateX above.
  // Timing is the date animation's, shifted 3 frames earlier (the Location file has no CTRL layer).
  const boxOpen = Math.min(
    interpolate(frame, [f(8.4), f(23.4)], [0, 1], {
      ...CLAMP,
      easing: EASE_OUT,
    }),
    interpolate(frame, [fromEnd(28.5), fromEnd(13.5)], [1, 0], {
      ...CLAMP,
      easing: EASE_IN_OUT,
    }),
  );
  // Hides the right part of the chip while the box is still opening
  const boxClip = `inset(0 ${(1 - boxOpen) * 100}% 0 0)`;

  // Text hides again before the chip closes
  const textOut = interpolate(
    frame,
    [fromEnd(28.5), fromEnd(21)],
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
            // Cuts the top-left and bottom-right corners (10px)
            clipPath:
              "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
          }}
        >
          {words.map((word, i) => {
            // Each word starts 3 frames after the previous one and takes 15 frames
            const start = 12 + i * 3;
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

      {/* Red square with the pin icon */}
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
        <Pin />
      </div>
    </AbsoluteFill>
  );
}
