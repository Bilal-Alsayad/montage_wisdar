import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { measureText } from "@remotion/layout-utils";

// ============================================================
// Shared constants / helpers
// ============================================================

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const TAGS_ANIMATION_DURATION = 180;
export const SOURCE_ANIMATION_DURATION = 166;

// Toplam sure: tags biter bitmez source baslar, ikisinin toplami.
export const TAGS_AND_SOURCE_DURATION =
  TAGS_ANIMATION_DURATION + SOURCE_ANIMATION_DURATION;

const remapTagFrame = (frame: number) => {
  if (frame < 55) {
    return frame;
  }

  if (frame < 148) {
    return interpolate(frame, [55, 148], [55, 96], CLAMP);
  }

  return 96 + (frame - 148);
};

const remapSourceFrame = (frame: number) => {
  if (frame < 63) {
    return frame;
  }

  if (frame < 132) {
    return interpolate(frame, [63, 132], [63, 95], CLAMP);
  }

  return 95 + (frame - 132);
};

// ============================================================
// TagRowAnimation (tek satirlik konum / tarih / kaynak animasyonu)
// ============================================================

const toRemotionFrame = (lottieFrame: number) => lottieFrame * 1.2;

const lottieInterpolate = (
  frame: number,
  lottieRange: [number, number],
  outputRange: [number, number],
  easing: (input: number) => number,
) =>
  interpolate(
    frame,
    [lottieRange[0] * 1.2, lottieRange[1] * 1.2],
    outputRange,
    {
      easing,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

const clampedSpanWidth = (right: number, width: number) =>
  Math.max(0, Math.min(width, right));

const EASE = {
  bar: Easing.bezier(0.127, 0.117, 0.121, 1),
  capMove: Easing.bezier(0.179, 0.528, 0.314, 0.994),
  textMove: Easing.bezier(0.127, 0.391, 0.434, 1),
  tracking: Easing.bezier(0.289, 0.381, 0.667, 1),
  shrink: Easing.bezier(0.167, 0.153, 0.833, 1),
  iconMove: Easing.bezier(0.013, 0.201, 0.307, 1),
};

const ROW_HEIGHT = 58;

const ICON_BOX_WIDTH = 52;
const ICON_BOX_HEIGHT = 56;
const ICON_SIZE = 46;

const fontSize = 35;
const MAX_LETTER_SPACING = 7;
const TEXT_LEFT_PADDING = 80;

interface TagRowAnimationProps {
  text: string;
  top: number;
  iconPath: string;
  fontFamily: string;
  frame: number;
}

function TagRowAnimation({
  text,
  top,
  iconPath,
  fontFamily,
  frame,
}: TagRowAnimationProps) {
  const iconUrl = staticFile(iconPath);

  // Icerige gore genisligi dinamik hesapla.
  // letterSpacing 0 durumunda (animasyonun son hali) olcum yapiyoruz
  // ki text ile icon kutusu arasinda bosluk kalmasin.
  const naturalTextWidth = measureText({
    text,
    fontFamily,
    fontSize,
  }).width;
  const width = Math.ceil(TEXT_LEFT_PADDING + naturalTextWidth + ICON_BOX_WIDTH + 10);

  const purpleRight = lottieInterpolate(frame, [0, 22], [41.08, width], EASE.bar);

  const purpleLeft =
    frame < toRemotionFrame(13)
      ? 0
      : lottieInterpolate(frame, [13, 35], [0, width], EASE.bar);

  const purpleWidth = clampedSpanWidth(purpleRight, width) - purpleLeft;

  const movingCapRight = lottieInterpolate(
    frame,
    [0, 22],
    [41.48, width + 0.47],
    EASE.capMove,
  );

  const iconHasStarted = frame >= toRemotionFrame(26);
  const exitHasStarted = frame >= toRemotionFrame(80);

  const iconBoxLeft = width - ICON_BOX_WIDTH;

  const textStyle = {
    position: "absolute" as const,
    left: lottieInterpolate(frame, [1, 25], [width, TEXT_LEFT_PADDING], EASE.textMove),
    fontFamily,
    fontSize,
    letterSpacing: lottieInterpolate(
      frame,
      [11, 32],
      [MAX_LETTER_SPACING, 0],
      EASE.tracking,
    ),
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "flex-end",
    height: ROW_HEIGHT,
  };

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top,
        width: width + 1,
        height: 66,
        overflow: "visible",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(0 0 0 ${
            exitHasStarted
              ? lottieInterpolate(frame, [80, 102], [41.48, width + 0.47], EASE.capMove)
              : 0
          }px)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 1,
            width: clampedSpanWidth(
              lottieInterpolate(frame, [6, 28], [41.08, width], EASE.bar),
              width,
            ),
            height: ICON_BOX_HEIGHT,
            background:
              "linear-gradient(90deg, rgba(26, 1, 47, 0.35), rgba(82, 47, 113, 0.35))",
          }}
        />

        {iconHasStarted && (
          <div
            style={{
              position: "absolute",
              left: iconBoxLeft,
              top: 1,
              width: ICON_BOX_WIDTH,
              height: ICON_BOX_HEIGHT,
              overflow: "hidden",
              backgroundColor: "#FFFFFF",
            }}
          >
            <div
              style={{
                position: "absolute",
                left:
                  lottieInterpolate(
                    frame,
                    [26, 46],
                    [width - 99.46, width - 49.46],
                    EASE.iconMove,
                  ) - iconBoxLeft,
                top: 5,
                width: ICON_SIZE,
                height: ICON_SIZE,
                backgroundColor: "#522F71",
                WebkitMaskImage: `url("${iconUrl}")`,
                maskImage: `url("${iconUrl}")`,
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
          </div>
        )}

        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: clampedSpanWidth(movingCapRight, width),
            height: ROW_HEIGHT,
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", left: 0, top: 0, width, height: ROW_HEIGHT }}>
            <div style={{ ...textStyle, color: "#FFFFFF" }}>{text}</div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: purpleLeft,
            top: 0,
            width: purpleWidth,
            height: ROW_HEIGHT,
            backgroundColor: "#522F71",
          }}
        />

        {purpleWidth > 0 && (
          <div
            style={{
              position: "absolute",
              left: purpleLeft,
              top: 0,
              width: purpleWidth,
              height: ROW_HEIGHT,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: -purpleLeft,
                top: 0,
                width,
                height: ROW_HEIGHT,
              }}
            >
              <div style={{ ...textStyle, color: "#000000" }}>{text}</div>
            </div>
          </div>
        )}

        {!iconHasStarted && (
          <div
            style={{
              position: "absolute",
              left:
                movingCapRight -
                lottieInterpolate(frame, [9, 26], [41.08, 0.72], EASE.shrink),
              top: 0,
              width: lottieInterpolate(frame, [9, 26], [41.08, 0.72], EASE.shrink),
              height: ROW_HEIGHT,
              backgroundColor: "#FFFFFF",
            }}
          />
        )}
      </div>

      {exitHasStarted && (
        <div
          style={{
            position: "absolute",
            left:
              lottieInterpolate(frame, [80, 102], [41.48, width + 0.47], EASE.capMove) -
              lottieInterpolate(frame, [89, 106], [41.08, 0.72], EASE.shrink),
            top: 0,
            width: lottieInterpolate(frame, [89, 106], [41.08, 0.72], EASE.shrink),
            height: ROW_HEIGHT,
            backgroundColor: "#FFFFFF",
          }}
        />
      )}
    </div>
  );
}

// ============================================================
// TagsAnimation (asil disari acilan component)
// ============================================================

interface TagsAnimationProps {
  location?: string;
  date?: string;
  source?: string;
  fontFamily: string;
}

export default function TagsAnimation({
  location,
  date,
  source,
  fontFamily,
}: TagsAnimationProps) {
  const frame = useCurrentFrame();

  const hasTags = Boolean(location || date);
  const hasSource = Boolean(source);

  if (!hasTags && !hasSource) {
    return null;
  }

  // location/date animasyonu 0'dan basliyor.
  const tagsFrame = remapTagFrame(frame);

  // source animasyonu, tags animasyonu bittikten sonra baslar (orijinal davranis).
  // Eger tags yoksa (sadece source varsa) source hemen 0'dan baslar.
  const sourceStartOffset = hasTags ? TAGS_ANIMATION_DURATION : 0;
  const sourceFrame = remapSourceFrame(frame - sourceStartOffset);

  return (
    <AbsoluteFill
      style={{
        position: "absolute",
        left: 0,
        top: 420,
        width: 1080,
        height: 1080,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {location && (
        <TagRowAnimation
          text={location}
          iconPath="mee/images/location.png"
          top={60}
          fontFamily={fontFamily}
          frame={tagsFrame}
        />
      )}

      {date && (
        <TagRowAnimation
          text={date}
          iconPath="mee/images/date.png"
          top={location ? 120 : 60}
          fontFamily={fontFamily}
          frame={tagsFrame}
        />
      )}

      {hasSource && frame >= sourceStartOffset && (
        <TagRowAnimation
          text={source as string}
          iconPath="mee/images/source.png"
          top={60}
          fontFamily={fontFamily}
          frame={sourceFrame}
        />
      )}
    </AbsoluteFill>
  );
}