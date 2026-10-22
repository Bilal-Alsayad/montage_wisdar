import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { splitTitle } from "../../utils/textUtils";
import { f } from "../../utils/constants";

// All frame numbers below are written for 30fps. f() converts them to the video fps.
export const TITLE_ANIMATION_DURATION = f(150);

// Easing curves (cubic-bezier)
const EASE_OUT = Easing.bezier(0.22, 1, 0.36, 1); // fast start, long soft landing
const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1); // smooth start and end
const LOTTIE_EASE = Easing.bezier(0.12, 0, 0.12, 1); // easing taken from the Lottie file

const CLAMP = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

// Boxes rest with their right edge at x = 908 (canvas is 1080 wide)
const RIGHT = 1080 - 908;
// Distance from the off-screen start position (x = 1668) to rest (x = 908)
const SLIDE_DISTANCE = 760;

// Box slide timing: [enter start, enter end, exit start, exit end]
const LINE1_SLIDE = [3, 27, 111, 129];
const LINE2_SLIDE = [7, 31, 115, 133];

// Frame where the first word of each line starts to appear
const LINE1_TEXT_START = 16;
const LINE2_TEXT_START = 20;

function Box({
  text,
  color,
  textStart,
}: {
  text: string;
  color: string;
  textStart: number;
}) {
  const frame = useCurrentFrame();
  const words = text.split(" ").filter(Boolean);

  return (
    <div
      dir="rtl"
      style={{
        height: 112,
        lineHeight: "112px",
        width: "fit-content",
        padding: "0 34px",
        fontSize: 68,
        color: "#F4F4F2",
        whiteSpace: "nowrap",
        backgroundColor: color,
        // Cuts the top-left and bottom-right corners (20px)
        clipPath:
          "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
      }}
    >
      {words.map((word, i) => {
        // Each word starts 3 frames after the previous one and takes 14 frames
        const start = textStart + i * 3;
        const progress = interpolate(frame, [f(start), f(start + 14)], [0, 1], {
          ...CLAMP,
          easing: LOTTIE_EASE,
        });

        return (
          <span key={i}>
            {i > 0 && " "}
            <span
              style={{
                display: "inline-block",
                opacity: progress,
                // Word rises 46px from below
                transform: `translateY(${(1 - progress) * 46}px)`,
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </div>
  );
}

function Stars() {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [f(27), f(33)], [0, 1], CLAMP);
  const fadeOut = interpolate(frame, [f(104), f(110)], [1, 0], CLAMP);

  // Pops up to 112% then settles at 100%
  const scale = interpolate(frame, [f(27), f(34.5), f(37.5)], [0, 1.12, 1], {
    ...CLAMP,
    easing: LOTTIE_EASE,
  });

  // Three 5-point stars, 34px apart
  const star = (cx: number) =>
    Array.from({ length: 10 }, (_, i) => {
      const radius = i % 2 === 0 ? 11 : 4.62;
      const angle = ((-90 + i * 36) * Math.PI) / 180;
      return `${cx + radius * Math.cos(angle)},${12 + radius * Math.sin(angle)}`;
    }).join(" ");

  return (
    <svg
      width={92}
      height={24}
      style={{
        position: "absolute",
        left: 856 - 46,
        top: 904 - 12,
        opacity: Math.min(fadeIn, fadeOut),
        transform: `scale(${scale})`,
        overflow: "visible",
      }}
    >
      <polygon points={star(12)} fill="#F4F4F2" />
      <polygon points={star(46)} fill="#F4F4F2" />
      <polygon points={star(80)} fill="#F4F4F2" />
    </svg>
  );
}

export default function TitleAnimation({
  fontFamily,
  text,
}: {
  fontFamily: string;
  text: string;
}) {
  const frame = useCurrentFrame();
  const { text1, text2 } = splitTitle(text);

  // How far a box is pushed to the right: slides in, rests at 0, then slides out
  const getSlideX = ([enterStart, enterEnd, exitStart, exitEnd]: number[]) => {
    if (frame < f(exitStart)) {
      return interpolate(frame, [f(enterStart), f(enterEnd)], [SLIDE_DISTANCE, 0], {
        ...CLAMP,
        easing: EASE_OUT,
      });
    }
    return interpolate(frame, [f(exitStart), f(exitEnd)], [0, SLIDE_DISTANCE], {
      ...CLAMP,
      easing: EASE_IN_OUT,
    });
  };

  // Green line wipes in from the right, and back out at the end
  const ruleIn = interpolate(frame, [f(24), f(39)], [0, 1], {
    ...CLAMP,
    easing: LOTTIE_EASE,
  });
  const ruleOut = interpolate(frame, [f(104), f(113)], [1, 0], {
    ...CLAMP,
    easing: LOTTIE_EASE,
  });
  const ruleVisible = Math.min(ruleIn, ruleOut);

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Stars />

      {/* Line 1 */}
      <div
        style={{
          position: "absolute",
          top: 934,
          right: RIGHT,
          transform: `translateX(${getSlideX(LINE1_SLIDE)}px)`,
        }}
      >
        <Box text={text1} color="#9F1117" textStart={LINE1_TEXT_START} />
      </div>

      {/* Line 2 + green line.
          The wrapper does not move, so its width always equals the box width.
          That lets the green line be 42% of the box width. */}
      {text2 && (
        <div style={{ position: "absolute", top: 1060, right: RIGHT }}>
          <div style={{ transform: `translateX(${getSlideX(LINE2_SLIDE)}px)` }}>
            <Box text={text2} color="#0D1013" textStart={LINE2_TEXT_START} />
          </div>
          <div
            style={{
              marginTop: 11,
              marginLeft: "auto",
              width: "42%",
              height: 6,
              backgroundColor: "#07843C",
              clipPath: `inset(0 0 0 ${(1 - ruleVisible) * 100}%)`,
            }}
          />
        </div>
      )}
    </AbsoluteFill>
  );
}
