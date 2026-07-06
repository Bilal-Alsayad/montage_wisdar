import { Easing, interpolate, useCurrentFrame } from "remotion";

const toRemotionFrame = (lottieFrame: number) => lottieFrame * 1.2;

const lottieInterpolate = (
  frame: number,
  lottieRange: [number, number],
  outputRange: [number, number],
  easing: (input: number) => number,
) =>
  interpolate(
    frame,
    [
      toRemotionFrame(lottieRange[0]),
      toRemotionFrame(lottieRange[1]),
    ],
    outputRange,
    {
      easing,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

const EASE = {
  bar: Easing.bezier(0.127, 0.117, 0.121, 1),
  capMove: Easing.bezier(0.169, 0.555, 0.314, 0.993),
  nameMove: Easing.bezier(0.154, 0.444, 0.434, 1),
  tracking: Easing.bezier(0.289, 0.381, 0.667, 1),
  descriptionDrop: Easing.bezier(0.185, 0.465, 0.48, 0.998),
  exitMove: Easing.bezier(0.169, 0.479, 0.314, 0.994),
  shrink: Easing.bezier(0.167, 0.153, 0.833, 1),
  fade: Easing.bezier(0.167, 0.167, 0.833, 0.833),
};

const BAR_LEFT = 0;

export const SPEAKER_ANIMATION_DURATION = 112;

interface SpeakerAnimationProps {
  name?: string;
  description?: string;
  fontFamily: string;
}

export default function SpeakerAnimation({
  name,
  description,
  fontFamily,
}: SpeakerAnimationProps) {
  const frame = useCurrentFrame();

  if (!name && !description) {
    return null;
  }

  const purpleRight = lottieInterpolate(
    frame,
    [2, 24],
    [-97, 529],
    EASE.bar,
  );

  const purpleEraseLeft = interpolate(
    frame,
    [toRemotionFrame(15), toRemotionFrame(37) + 3],
    [-87, 529],
    {
      easing: EASE.bar,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const movingCapRight = lottieInterpolate(
    frame,
    [2, 24],
    [-88, 529],
    EASE.capMove,
  );

  const movingCapWidth = lottieInterpolate(
    frame,
    [11, 28],
    [43, 1],
    EASE.shrink,
  );

  const movingCapOpacity = lottieInterpolate(
    frame,
    [27, 28],
    [1, 0],
    EASE.fade,
  );

  const staticCapOpacity =
    frame < toRemotionFrame(27)
      ? 0
      : lottieInterpolate(frame, [36, 59], [1, 0], EASE.fade);

  const nameLeft = lottieInterpolate(
    frame,
    [3, 27],
    [137, 56],
    EASE.nameMove,
  );

  const nameLetterSpacing = lottieInterpolate(
    frame,
    [13, 34],
    [7, 0],
    EASE.tracking,
  );

  const backdropRight = lottieInterpolate(
    frame,
    [8, 30],
    [-100, 476],
    EASE.bar,
  );

  const backdropEnterOpacity = lottieInterpolate(
    frame,
    [13, 31],
    [0, 1],
    EASE.fade,
  );

  const backdropExitOpacity = lottieInterpolate(
    frame,
    [67, 82],
    [1, 0],
    EASE.fade,
  );

  const descriptionTranslateY = lottieInterpolate(
    frame,
    [14, 39],
    [-95, 0],
    EASE.descriptionDrop,
  );

  const descriptionLineHeight = lottieInterpolate(
    frame,
    [15, 40],
    [50, 42],
    EASE.descriptionDrop,
  );

  const descriptionOpacity =
    frame < toRemotionFrame(14)
      ? 0
      : lottieInterpolate(frame, [67, 82], [1, 0], EASE.fade);

  const exitEraserRight = lottieInterpolate(
    frame,
    [66, 88],
    [BAR_LEFT, 529],
    EASE.exitMove,
  );

  const exitEraserWidth = lottieInterpolate(
    frame,
    [75, 92],
    [54, 0],
    EASE.shrink,
  );


  const purpleLeft =
    frame < toRemotionFrame(15)
      ? BAR_LEFT
      : Math.max(BAR_LEFT, purpleEraseLeft);

  const purpleWidth = Math.max(
    0,
    Math.max(BAR_LEFT, Math.min(529, purpleRight)) - purpleLeft,
  );

  const exitHasStarted = frame >= toRemotionFrame(66);

  return (
    <div
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
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(0 0 0 ${
            exitHasStarted ? exitEraserRight : BAR_LEFT
          }px)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: BAR_LEFT,
            top: 514,
            width: Math.max(0, backdropRight - BAR_LEFT),
            height: 60,
            opacity: Math.min(
              backdropEnterOpacity,
              backdropExitOpacity,
            ),
            background:
              "linear-gradient(90deg, rgba(0, 0, 0, 0.35), rgba(82, 47, 113, 0.35))",
          }}
        />

        {name ? (
          <div
            style={{
              position: "absolute",
              left: BAR_LEFT,
              top: 514,
              width: Math.max(
                0,
                Math.max(BAR_LEFT, Math.min(529, movingCapRight)) - BAR_LEFT,
              ),
              height: 60,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: nameLeft - BAR_LEFT,
                top: "50%",
                transform: "translateY(-50%)",
                fontFamily,
                fontSize: 41,
                lineHeight: 1,
                letterSpacing: nameLetterSpacing,
                color: "#FFFFFF",
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </div>
          </div>
        ) : null}


        <div
          style={{
            position: "absolute",
            left: 475,
            top: 514,
            width: 54,
            height: 60,
            backgroundColor: "#FFFFFF",
            opacity: staticCapOpacity,
          }}
        />

        <div
          style={{
            position: "absolute",
            left: purpleLeft,
            top: 514,
            width: purpleWidth,
            height: 60,
            backgroundColor: "#522F71",
          }}
        />



        {name && purpleWidth > 0 ? (
          <div
            style={{
              position: "absolute",
              left: purpleLeft,
              top: 514,
              width: purpleWidth,
              height: 60,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: nameLeft - purpleLeft,
                top: "50%",
                transform: "translateY(-50%)",
                fontFamily,
                fontSize: 41,
                lineHeight: 1,
                letterSpacing: nameLetterSpacing,
                color: "#000000",
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </div>
          </div>
        ) : null}

        <div
          style={{
            position: "absolute",
            left: movingCapRight - movingCapWidth,
            top: 514,
            width: movingCapWidth,
            height: 60,
            backgroundColor: "#FFFFFF",
            opacity: movingCapOpacity,
          }}
        />
      </div>

      {description ? (
        <div
          style={{
            position: "absolute",
            left: 52,
            top: 576,
            width: 477,
            height: 112,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              transform: `translateY(${descriptionTranslateY}px)`,
              opacity: descriptionOpacity,
              fontFamily,
              fontSize: 35,
              lineHeight: `${descriptionLineHeight}px`,
              color: "#FFFFFF",
              whiteSpace: "pre-line",
            }}
          >
            {description}
          </div>
        </div>
      ) : null}

      {exitHasStarted ? (
        <div
          style={{
            position: "absolute",
            left: exitEraserRight - exitEraserWidth,
            top: 514,
            width: exitEraserWidth,
            height: 60,
            backgroundColor: "#FFFFFF",
          }}
        />
      ) : null}
    </div>
  );
}