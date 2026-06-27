import {
  interpolate,
  useCurrentFrame,
  Easing,
  Img,
  staticFile,
} from "remotion";

interface RotatingBoxWithTextProps {
  startFrame?: number;
  boxColor?: string;
  x?: number;
  y?: number;
}

// Total entry
const ROTATION_DURATION = 50; // Box rotation phase
const IMG_SCALE_DELAY = 6; // Frames after rotation ends before image starts
const IMG_SCALE_DURATION = 28; // Image scale-up duration

// Box specs
const BOX_WIDTH = 121;
const BOX_HEIGHT = 32;
const BOX_RADIUS = 16;

// Trail config
const TRAIL_COUNT = 5;

export const ROTATING_BOX_DURATION =
  ROTATION_DURATION + IMG_SCALE_DELAY + IMG_SCALE_DURATION + 10;

export default function RotatingBoxWithText({
  startFrame = 0,
  boxColor = "#ee494f",
  x = 972,
  y = 285,
}: RotatingBoxWithTextProps) {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  if (localFrame < 0) return null;

  // === Phase 1: Box rotation (0 → ROTATION_DURATION) ===
  const rotation = interpolate(localFrame, [0, ROTATION_DURATION], [90, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Box opacity: fade in quickly at start
  const boxOpacity = interpolate(localFrame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // === Trail (ghost copies) ===
  const trails = [];
  for (let i = 0; i < TRAIL_COUNT; i++) {
    // Each trail is delayed slightly behind the main box
    const trailDelay = (i + 1) * 3; // frames behind
    const trailFrame = localFrame - trailDelay;

    if (trailFrame < 0 || localFrame >= ROTATION_DURATION + 8) continue;

    const trailRotation = interpolate(
      trailFrame,
      [0, ROTATION_DURATION],
      [90, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
      },
    );

    // Trail fades out more the further behind it is
    const trailOpacity = interpolate(i, [0, TRAIL_COUNT - 1], [0.35, 0.08], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    // Also fade trails out near end of rotation
    const trailFade =
      localFrame >= ROTATION_DURATION
        ? interpolate(
            localFrame,
            [ROTATION_DURATION, ROTATION_DURATION + 8],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          )
        : 1;

    trails.push(
      <div
        key={`trail-${i}`}
        style={{
          position: "absolute",
          width: BOX_WIDTH,
          height: BOX_HEIGHT,
          borderRadius: BOX_RADIUS,
          backgroundColor: boxColor,
          opacity: trailOpacity * trailFade,
          transform: `translate(-50%, -50%) rotate(${trailRotation}deg)`,
          top: 0,
          left: 0,
        }}
      />,
    );
  }

  // === Phase 2: Image scale (after rotation) ===
  const imgScaleStart = ROTATION_DURATION + IMG_SCALE_DELAY;
  const imgScaleEnd = imgScaleStart + IMG_SCALE_DURATION;

  const imgScale = interpolate(
    localFrame,
    [imgScaleStart, imgScaleEnd],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.7)),
    },
  );

  const imgOpacity = interpolate(
    localFrame,
    [imgScaleStart, imgScaleStart + 14],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Container for trails + main box */}
      <div style={{ position: "relative", width: 0, height: 0 }}>
        {/* Ghost trails */}
        {trails}

        {/* Main rotating box */}
        <div
          style={{
            position: "absolute",
            width: BOX_WIDTH,
            height: BOX_HEIGHT,
            borderRadius: BOX_RADIUS,
            backgroundColor: boxColor,
            opacity: boxOpacity,
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            top: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Image appears after rotation finishes */}
          <Img
            src={
              `${staticFile("noon/elements/special.png")}`
            }
            style={{
              height: BOX_HEIGHT - 4,
              transform: `scale(${imgScale})`,
              opacity: imgOpacity,
            }}
          />
        </div>
      </div>
    </div>
  );
}
