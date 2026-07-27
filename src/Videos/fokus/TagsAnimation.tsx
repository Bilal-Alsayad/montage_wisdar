import {
  // Img,
  interpolate,
  useCurrentFrame,
  Easing,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";
// import { MONTAGE_FILES_URL } from "../../utils/constants";

// Easing
const EASE = Easing.bezier(0.6, 0, 0.4, 1);
const ICON_EASE = Easing.bezier(0.167, 0.167, 0.4, 1);

// ---- Location row timing ----
const LOC_ICON_BOX_START = 7;
const LOC_ICON_BOX_END = 19;
const LOC_ICON_SCALE_START = 7;
const LOC_ICON_SCALE_END = 17;
const LOC_ICON_SCALE_FROM = 3.38;
const LOC_BOX_START = 19;
const LOC_BOX_END = 34;
const LOC_TEXT_START = 24;
const LOC_TEXT_DURATION = 15;

// ---- Source row timing ----
const SRC_ICON_BOX_START = 18;
const SRC_ICON_BOX_END = 30;
const SRC_BOX_START = 28;
const SRC_BOX_END = 43;
const SRC_TEXT_START = 33;
const SRC_TEXT_DURATION = 15;

const SRC_ICON_ANIM_OFFSET = SRC_ICON_BOX_END;
const SRC_ICON_SLIDE_DURATION = 17;
const SRC_STRIPE_TIMING = [
  { start: 8, end: 27 },
  { start: 11, end: 30 },
  { start: 14, end: 33 },
  { start: 16, end: 35 },
];
const SRC_STRIPE_Y = [10.5, 14.3, 18.2, 22.0];
const SRC_STRIPE_HEIGHT = 1.7;
const SRC_SLIDE_FROM_Y = 24.1;

// Exit timing
const ENTER_SPAN = 65;

interface TagsAnimationProps {
  source?: string;
  location?: string;
  fontSemiBold: string;
  fontMedium: string;
}

/**
 * Renders text with character-by-character fade-in
 */
function AnimatedText({
  text,
  startFrame,
  duration,
  activeFrame,
}: {
  text: string;
  startFrame: number;
  duration: number;
  activeFrame: number;
}) {
  const chars = text.split("");
  const charCount = chars.length;
  const staggerPerChar = duration / Math.max(charCount, 1);

  return (
    <>
      {chars.map((char, i) => {
        const charStart = startFrame + (charCount - 1 - i) * staggerPerChar;
        const charEnd = charStart + staggerPerChar * 2;
        const charOpacity = interpolate(
          activeFrame,
          [charStart, charEnd],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        return (
          <span key={i} style={{ opacity: charOpacity }}>
            {char}
          </span>
        );
      })}
    </>
  );
}

function SourceIconSVG({
  activeFrame,
  size = 28,
  color = "#ffffff",
}: {
  activeFrame: number;
  size?: number;
  color?: string;
}) {
  const iconFrame = activeFrame - SRC_ICON_ANIM_OFFSET;

  if (iconFrame < 0) return null;

  const slideY = interpolate(
    iconFrame,
    [0, SRC_ICON_SLIDE_DURATION],
    [SRC_SLIDE_FROM_Y, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ICON_EASE },
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 33 33"
      style={{ overflow: "hidden" }}
    >
      <defs>
        <clipPath id="srcIconViewport">
          <rect x="0" y="0" width="33" height="33" />
        </clipPath>
        <clipPath id="srcStripeClip">
          <rect x="9" y="6.1" width="14.5" height="19.8" rx="2" />
        </clipPath>
      </defs>

      <g clipPath="url(#srcIconViewport)">
        <g transform={`translate(0, ${slideY})`}>
          {/* Outer body */}
          <path
            d={`
              M 26.2 9.1
              C 26.2 8.8 26.2 5.4 21.7 4.4
              L 15.8 4.4
              C 10.6 4.4 10.0 4.5 9.9 4.5
              C 8.7 4.9 6.3 7.5 6.3 8.8
              L 6.3 23.2
              C 6.3 25.6 7.0 25.6 7.0 25.6
              C 7.0 25.6 9.9 27.5 12.6 27.6
              C 12.6 27.6 21.6 27.6 23.6 27.2
              C 23.6 27.2 26.2 25.5 26.2 23.2
              Z
            `}
            fill={color}
          />
          {/* Inner cutout */}
          <path
            d={`
              M 24.5 9.0
              C 24.5 6.1 21.7 6.1 21.7 6.1
              L 10.8 6.1
              C 8.0 6.1 8.0 8.9 8.0 8.9
              L 8.0 23.2
              C 8.0 25.9 10.2 25.9 10.2 25.9
              C 11.9 25.9 14.8 25.9 14.8 25.9
              L 21.7 25.9
              C 24.5 25.9 24.5 23.0 24.5 23.0
              Z
            `}
            fill="#b70c08"
          />

          <g clipPath="url(#srcStripeClip)">
            {SRC_STRIPE_TIMING.map((timing, i) => {
              const stripeSlideX = interpolate(
                iconFrame,
                [timing.start, timing.end],
                [-20, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: ICON_EASE,
                },
              );

              return (
                <rect
                  key={i}
                  x={9}
                  y={SRC_STRIPE_Y[i] - SRC_STRIPE_HEIGHT / 2}
                  width={14.5}
                  height={SRC_STRIPE_HEIGHT}
                  rx={0.85}
                  fill={color}
                  transform={`translate(${stripeSlideX}, 0)`}
                />
              );
            })}
          </g>
        </g>
      </g>
    </svg>
  );
};

export default function TagsAnimation({
  source,
  location,
  fontSemiBold,
  fontMedium,
}: TagsAnimationProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Exit
  const exitStart = durationInFrames - ENTER_SPAN;
  const reverseFrame = Math.max(
    0,
    Math.min(ENTER_SPAN, ENTER_SPAN - (frame - exitStart)),
  );
  const activeFrame = frame >= exitStart ? reverseFrame : frame;

  // ---- SOURCE ROW animations ----
  const srcIconScale = interpolate(
    activeFrame,
    [SRC_ICON_BOX_START, SRC_ICON_BOX_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
  );

  const srcBoxScaleX = interpolate(
    activeFrame,
    [SRC_BOX_START, SRC_BOX_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
  );

  // ---- LOCATION ROW animations ----
  const locIconBoxScale = interpolate(
    activeFrame,
    [LOC_ICON_BOX_START, LOC_ICON_BOX_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
  );

  const locIconContentScale = interpolate(
    activeFrame,
    [LOC_ICON_SCALE_START, LOC_ICON_SCALE_END],
    [LOC_ICON_SCALE_FROM, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
  );

  const locBoxScaleX = interpolate(
    activeFrame,
    [LOC_BOX_START, LOC_BOX_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        position: "absolute",
        right: 48,
        top: 171,
      }}
    >
      {source && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: 48,
          }}
        >
          {/* Source text box */}
          <div
            style={{
              overflow: "hidden",
              height: "100%",
              transform: `scaleX(${srcBoxScaleX})`,
              transformOrigin: "right center",
            }}
          >
            <div
              style={{
                fontFamily: fontSemiBold,
                fontSize: 36,
                color: "white",
                backgroundColor: "#1F2326",
                padding: "0 10px",
                height: "100%",
                display: "flex",
                alignItems: "center",
                whiteSpace: "nowrap",
              }}
            >
              <AnimatedText
                text={source}
                startFrame={SRC_TEXT_START}
                duration={SRC_TEXT_DURATION}
                activeFrame={activeFrame}
              />
            </div>
          </div>
          {/* Source icon area */}
          <div
            style={{
              position: "relative",
              width: 48,
              height: 48,
            }}
          >
            {/* Box background */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#b70c08",
                transform: `scale(${srcIconScale})`,
                transformOrigin: "center center",
              }}
            />
            {/* Source icon animation */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SourceIconSVG activeFrame={activeFrame} size={28} />
            </div>
          </div>
        </div>
      )}
      {location && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: 48,
          }}
        >
          {/* Location text box */}
          <div
            style={{
              overflow: "hidden",
              height: "100%",
              transform: `scaleX(${locBoxScaleX})`,
              transformOrigin: "right center",
            }}
          >
            <div
              style={{
                fontFamily: fontMedium,
                fontSize: 36,
                color: "#ffffff",
                backgroundColor: "#b70c08",
                padding: "0 10px",
                height: "100%",
                display: "flex",
                alignItems: "center",
                whiteSpace: "nowrap",
              }}
            >
              <AnimatedText
                text={location}
                startFrame={LOC_TEXT_START}
                duration={LOC_TEXT_DURATION}
                activeFrame={activeFrame}
              />
            </div>
          </div>
          {/* Location icon area - icon and box are independent */}
          <div
            style={{
              position: "relative",
              width: 48,
              height: 48,
            }}
          >
            {/* Box background - scales from 0 */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#1f2326",
                transform: `scale(${locIconBoxScale})`,
                transformOrigin: "center center",
              }}
            />
            {/* Icon - appears independently, starts big and shrinks */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${locIconContentScale})`,
              }}
            >
              {/* <Img
                src={`${MONTAGE_FILES_URL}/fokussquareblack/icons/location.png`}
              /> */}
              <Img src={staticFile("fokus/images/location.png")} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
