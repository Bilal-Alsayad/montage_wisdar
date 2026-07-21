import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

interface SpeakerAnimationProps {
  nameText: string;
  descriptionText: string;
  fontBoldFamily: string;
  fontRegularFamily: string;
}

export const SPEAKER_ANIMATION_DURATION = 360;

// Lottie @25fps → Remotion @60fps = ×2.4
const R = 2.4;

const EASE = Easing.bezier(0.333, 0, 0.667, 1);

export default function SpeakerAnimation({
  nameText,
  descriptionText,
  fontBoldFamily,
  fontRegularFamily,
}: SpeakerAnimationProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // ── ENTER ──

  // Name text (Animator 1: word-by-word opacity sweep, t=6→25 @25fps)
  // Transform effect position: [498,960]→[540,960] t=6→19 → slideX = 498-540 = -42px
  const nameSlideX = interpolate(frame, [6 * R, 19 * R], [-42, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  // Name opacity (word sweep: selector s=0→100 over t=6→25)
  const nameRevealProgress = interpolate(frame, [6 * R, 25 * R], [-15, 110], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  // Description text: opacity t=18→24 (0→100)
  const descOpacity = interpolate(frame, [18 * R, 24 * R], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  // Description position: [573,960]→[540,960] t=18→30 → slideX = 573-540 = 33px
  const descSlideX = interpolate(frame, [18 * R, 30 * R], [33, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  // White dot (pill) — scaleY grows downward + slides from top to bottom
  const pillScaleY = interpolate(frame, [0, 7 * R], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  const pillSlideY = interpolate(frame, [5 * R, 18 * R], [-68, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  // Purple line + triangle — grows from right to left as one piece
  const lineScaleX = interpolate(frame, [6 * R, 34 * R], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  // White progress bar — starts AFTER line fully appears (34*R)
  // Lottie Layer 5: Linear Wipe 87→73 (13%→27% visible from right)
  const progressWidth = interpolate(
    frame,
    [34 * R, durationInFrames],
    [0, 27],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // ── EXIT (reverse-frame technique, matching Adjustment Layer 1) ──
  // Exit: position [540,960]→[604,960] t=140→149 → slideX = 604-540 = 64px
  // Exit: opacity 100→0 t=143→149
  // Exit: tint 0→100 t=137→145 (brightness)
  const exitDuration = Math.round(12 * R);
  const exitStart = durationInFrames - exitDuration;

  const exitSlideX = interpolate(
    frame,
    [exitStart, exitStart + Math.round(9 * R)],
    [0, 64],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE,
    },
  );

  const exitOpacity = interpolate(
    frame,
    [exitStart + Math.round(3 * R), exitStart + exitDuration],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE,
    },
  );

  const exitBrightness = interpolate(
    frame,
    [exitStart, exitStart + Math.round(8 * R)],
    [1, 3],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE,
    },
  );

  // Name text mask (RTL word sweep)
  const nameMask = `linear-gradient(to left, black 0%, black ${nameRevealProgress}%, transparent ${nameRevealProgress + 15}%, transparent 100%)`;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 1200,
          right: 150,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          transform: `translateX(${exitSlideX}px)`,
          opacity: exitOpacity,
          filter: `brightness(${exitBrightness})`,
        }}
      >
        {/* Speaker name */}
        <div
          style={{
            fontFamily: fontBoldFamily,
            fontSize: 62,
            color: "#EA78D9",
            transform: `translateX(${nameSlideX}px)`,
            WebkitMaskImage: nameMask,
            maskImage: nameMask,
          }}
        >
          {nameText}
        </div>

        {/* Description row */}
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", flexDirection: "row", gap: 20, alignItems: "center" }}>
            {/* Description text */}
            <div
              style={{
                fontFamily: fontRegularFamily,
                fontSize: 35,
                color: "#FFFFFF",
                opacity: descOpacity,
                transform: `translateX(${descSlideX}px)`,
              }}
            >
              {descriptionText}
            </div>

            {/* White pill */}
            <span
              style={{
                width: 37,
                height: 54,
                backgroundColor: "#FFFFFF",
                borderRadius: 50,
                display: "block",
                transform: `translateY(${pillSlideY}px) scaleY(${pillScaleY})`,
                transformOrigin: "center top",
              }}
            />
          </div>

          {/* Purple line + triangle (one piece, pulled from right to left) */}
          <div
            style={{
              position: "absolute",
              bottom: -15,
              right: 0,
              left: 0,
              clipPath: `inset(-20px 0 -20px ${(1 - lineScaleX) * 100}%)`,
            }}
          >
            {/* Purple layer */}
            <div style={{ height: "4px", backgroundColor: "#EA78D9" }} />
            <span
              style={{
                width: 0,
                height: 0,
                position: "absolute",
                top: 3,
                right: 0,
                borderStyle: "solid",
                borderWidth: "12px 0 0 12px",
                borderColor: "#aa50e6 transparent transparent transparent",
              }}
            />

            {/* White progress layer (same shapes, clipped from right) */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
                bottom: -16,
                clipPath: `inset(-20px 0 -20px ${100 - progressWidth}%)`,
              }}
            >
              <div style={{ height: "4px", backgroundColor: "#FFFFFF" }} />
              <span
                style={{
                  width: 0,
                  height: 0,
                  position: "absolute",
                  top: 3,
                  right: 0,
                  borderStyle: "solid",
                  borderWidth: "12px 0 0 12px",
                  borderColor: "#FFFFFF transparent transparent transparent",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}
