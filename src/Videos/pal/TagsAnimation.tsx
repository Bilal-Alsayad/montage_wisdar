import { AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame } from "remotion";
import TagsDecoration from "./TagsDecoration";

// Step animation constants
const STEP_DURATION = 2;
const LAST_STEP = 6;
const STEP_COUNT = LAST_STEP + 1;

// Shared layout constants
const RECT_X        = 775;
const RECT_Y        = 261;
const SQUARE_SIZE   = 44;
const FINAL_WIDTH   = 190;
const FINAL_HEIGHT  = 44;
const SQUARE_START_X = 771;
const SQUARE_START_Y = 278;

const TAG_ANIMATIONS = [
  {
    key: "location" as const,
    iconPath: "pal/icons/location.png",
    decoration: { x: -76, y: -224, scale: 0.23 },
    from: 220,
    duration: 142,
  },
  {
    key: "date" as const,
    iconPath: "pal/icons/date.png",
    decoration: { x: -80, y: -273, scale: 0.23 },
    from: 369,
    duration: 143,
  },
];

const getStep = (frame: number, durationInFrames: number) => {
  const transitionDuration = STEP_COUNT * STEP_DURATION;
  const outroStart = durationInFrames - transitionDuration;

  if (frame < transitionDuration) {
    return Math.min(LAST_STEP, Math.floor(frame / STEP_DURATION));
  }

  if (frame < outroStart) {
    return LAST_STEP;
  }

  return Math.max(
    0,
    Math.min(
      LAST_STEP,
      Math.floor((durationInFrames - 1 - frame) / STEP_DURATION),
    ),
  );
};

// Single tag item
interface TagItemProps {
  text: string;
  iconPath: string;
  decoration: { x: number; y: number; scale: number };
  durationInFrames: number;
  fontFamily: string;
}

function TagItem({ text, iconPath, decoration, durationInFrames, fontFamily }: TagItemProps) {
  const frame = useCurrentFrame();

  const step = getStep(frame, durationInFrames);
  const iconSrc = staticFile(iconPath);
  const squareFinalX = RECT_X - SQUARE_SIZE;
  const squareFinalY = RECT_Y;

  // Step visibility flags
  const showFirstGhostRect     = step === 0;
  const showSecondGhostRect    = step === 1;
  const showMiniSquare         = step === 1;
  const showFadedGhostRect     = step === 2;
  const showGrayIconSquare     = step === 2;
  const showRedSquare          = step >= 3;
  const showHalfWhiteRect      = step === 4;
  const showFullLowerWhiteRect = step === 5;
  const showFinalWhiteRect     = step === 6;
  const showText               = step === 6;

  return (
    <AbsoluteFill>
      <TagsDecoration
        x={RECT_X + decoration.x}
        y={RECT_Y + decoration.y}
        scale={decoration.scale}
      />

      {showFirstGhostRect ? (
        <div
          style={{
            position: "absolute",
            left: RECT_X,
            top: RECT_Y + 10,
            width: FINAL_WIDTH,
            height: 14,
            backgroundColor: "#aaaaaa",
            opacity: 0.45,
          }}
        />
      ) : null}

      {showSecondGhostRect ? (
        <div
          style={{
            position: "absolute",
            left: RECT_X,
            top: RECT_Y + 5,
            width: FINAL_WIDTH,
            height: 28,
            backgroundColor: "#aaaaaa",
            opacity: 0.7,
          }}
        />
      ) : null}

      {showMiniSquare ? (
        <div
          style={{
            position: "absolute",
            left: SQUARE_START_X,
            top: SQUARE_START_Y,
            width: 18,
            height: 18,
            backgroundColor: "#aaaaaa",
            opacity: 0.45,
          }}
        />
      ) : null}

      {showFadedGhostRect ? (
        <div
          style={{
            position: "absolute",
            left: RECT_X,
            top: RECT_Y,
            width: FINAL_WIDTH,
            height: 28,
            backgroundColor: "#aaaaaa",
            opacity: 0.25,
          }}
        />
      ) : null}

      {showGrayIconSquare ? (
        <div
          style={{
            position: "absolute",
            left: SQUARE_START_X,
            top: SQUARE_START_Y,
            width: SQUARE_SIZE,
            height: SQUARE_SIZE,
            backgroundColor: "#cdcdcd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Img src={iconSrc} style={{ width: 28, height: 28, objectFit: "contain" }} />
        </div>
      ) : null}

      {showRedSquare ? (
        <div
          style={{
            position: "absolute",
            left: squareFinalX,
            top: squareFinalY,
            width: SQUARE_SIZE,
            height: SQUARE_SIZE,
            background: "linear-gradient(135deg, #b50815 80%, #ef3038 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Img src={iconSrc} style={{ width: 28, height: 28, objectFit: "contain" }} />
        </div>
      ) : null}

      {showHalfWhiteRect ? (
        <div
          style={{
            position: "absolute",
            left: RECT_X,
            top: RECT_Y + FINAL_HEIGHT,
            width: FINAL_WIDTH,
            height: FINAL_HEIGHT,
            backgroundColor: "#ffffff",
            opacity: 0.5,
          }}
        />
      ) : null}

      {showFullLowerWhiteRect ? (
        <div
          style={{
            position: "absolute",
            left: RECT_X,
            top: RECT_Y + FINAL_HEIGHT,
            width: FINAL_WIDTH,
            height: FINAL_HEIGHT,
            backgroundColor: "#ffffff",
          }}
        />
      ) : null}

      {showFinalWhiteRect ? (
        <div
          style={{
            position: "absolute",
            left: RECT_X,
            top: RECT_Y,
            width: FINAL_WIDTH,
            height: FINAL_HEIGHT,
            backgroundColor: "#ffffff",
          }}
        />
      ) : null}

      {showText ? (
        <div
          style={{
            position: "absolute",
            left: RECT_X,
            top: RECT_Y,
            width: FINAL_WIDTH,
            height: FINAL_HEIGHT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#111111",
            fontFamily,
            fontSize: 22,
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </div>
      ) : null}
    </AbsoluteFill>
  );
}

// Main export — renders all tag animations based on data
interface TagsAnimationProps {
  location?: string;
  date?: string;
  fontFamily: string;
}

export default function TagsAnimation({ location, date, fontFamily }: TagsAnimationProps) {
  const data: Record<string, string | undefined> = { location, date };

  return (
    <AbsoluteFill>
      {TAG_ANIMATIONS.map(({ key, iconPath, decoration, from, duration }) => {
        const text = data[key];
        if (!text) return null;

        return (
          <Sequence key={key} from={from} durationInFrames={duration}>
            <TagItem
              text={text}
              iconPath={iconPath}
              decoration={decoration}
              durationInFrames={duration}
              fontFamily={fontFamily}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}
