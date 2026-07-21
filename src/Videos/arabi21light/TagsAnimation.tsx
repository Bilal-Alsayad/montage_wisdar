import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

interface TagsAnimationProps {
  location?: string;
  source?: string;
  date?: string;
  fontFamily: string;
  fontFamilyRegular?: string;
}

const EASE = Easing.bezier(0.333, 0, 0.667, 1);
const EASE_BOUNCE = Easing.bezier(0.333, 0, 0.667, 1);

export default function TagsAnimation({
  location,
  source,
  date,
  fontFamily,
  fontFamilyRegular,
}: TagsAnimationProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // --- Location enter ---
  const locEnterDuration = 67;

  const locBorderSlideX = interpolate(frame, [0, 58], [-94, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  const locBorderWipe = interpolate(frame, [0, 67], [88, 59], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const locBorderClipLeft = interpolate(locBorderWipe, [59, 88], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const locTextSlideX = interpolate(frame, [14, 58], [-50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  const locTextOpacity = interpolate(frame, [14, 67], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  const locIconScale = interpolate(frame, [12, 36, 50], [0, 1.08, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_BOUNCE,
  });

  const locIconRotation = interpolate(frame, [12, 36, 50], [9, -3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_BOUNCE,
  });

  // --- Location exit (reverse of enter) ---
  const locExitStart = durationInFrames - locEnterDuration;
  const locReverseFrame = Math.max(
    0,
    Math.min(locEnterDuration, locEnterDuration - (frame - locExitStart))
  );

  const locExitBorderSlideX = interpolate(locReverseFrame, [0, 58], [-94, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const locExitBorderWipe = interpolate(locReverseFrame, [0, 67], [88, 59], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const locExitBorderClipLeft = interpolate(locExitBorderWipe, [59, 88], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const locExitTextSlideX = interpolate(locReverseFrame, [14, 58], [-50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const locExitTextOpacity = interpolate(locReverseFrame, [14, 67], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const locExitIconScale = interpolate(locReverseFrame, [12, 36, 50], [0, 1.08, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_BOUNCE,
  });
  const locExitIconRotation = interpolate(locReverseFrame, [12, 36, 50], [9, -3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_BOUNCE,
  });

  // Location combined
  const locFinalSlideX = frame >= locExitStart ? locExitBorderSlideX : locBorderSlideX;
  const locFinalClipLeft = frame >= locExitStart ? locExitBorderClipLeft : locBorderClipLeft;
  const locFinalTextSlideX = frame >= locExitStart ? locExitTextSlideX : locTextSlideX;
  const locFinalTextOpacity = Math.min(locTextOpacity, locExitTextOpacity);
  const locFinalIconScale = Math.min(locIconScale, locExitIconScale);
  const locFinalIconRotation = frame >= locExitStart ? locExitIconRotation : locIconRotation;

  // --- Source enter ---
  const srcBoxScaleY = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  const srcTextContainerScaleX = interpolate(frame, [12, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  const srcIconScale = interpolate(frame, [12, 40, 56], [0, 1.08, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_BOUNCE,
  });

  const srcIconRotation = interpolate(frame, [12, 40, 56], [-21, 5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_BOUNCE,
  });

  const srcTextOpacity = interpolate(frame, [28, 46], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  const srcTextSlideX = interpolate(frame, [22, 50], [-18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  // --- Source exit (reverse of enter, starts at 5s) ---
  const srcExitStart = 300;
  const srcEnterDuration = 56;

  const srcReverseFrame = Math.max(
    0,
    Math.min(srcEnterDuration, srcEnterDuration - (frame - srcExitStart))
  );

  const srcExitBoxScaleY = interpolate(srcReverseFrame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const srcExitContainerScaleX = interpolate(srcReverseFrame, [12, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const srcExitIconScale = interpolate(srcReverseFrame, [12, 40, 56], [0, 1.08, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_BOUNCE,
  });
  const srcExitIconRotation = interpolate(srcReverseFrame, [12, 40, 56], [-21, 5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_BOUNCE,
  });
  const srcExitTextOpacity = interpolate(srcReverseFrame, [28, 46], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const srcExitTextSlideX = interpolate(srcReverseFrame, [22, 50], [-18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  // Source combined
  const srcFinalBoxScaleY = Math.min(srcBoxScaleY, srcExitBoxScaleY);
  const srcFinalContainerScaleX = Math.min(srcTextContainerScaleX, srcExitContainerScaleX);
  const srcFinalIconScale = Math.min(srcIconScale, srcExitIconScale);
  const srcFinalTextOpacity = Math.min(srcTextOpacity, srcExitTextOpacity);
  const srcFinalTextSlideX = frame >= srcExitStart ? srcExitTextSlideX : srcTextSlideX;
  const srcFinalIconRotation = frame >= srcExitStart ? srcExitIconRotation : srcIconRotation;

  // --- Date enter ---
  const dateEnterDuration = 89;

  const dateSlideX = interpolate(frame, [0, 77], [97, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  const dateOpacity = interpolate(frame, [0, 89], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  const dateBlur = interpolate(frame, [0, 70], [6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  // --- Date exit (reverse of enter) ---
  const dateExitStart = durationInFrames - dateEnterDuration;
  const dateReverseFrame = Math.max(
    0,
    Math.min(dateEnterDuration, dateEnterDuration - (frame - dateExitStart))
  );

  const dateExitSlideX = interpolate(dateReverseFrame, [0, 77], [97, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const dateExitOpacity = interpolate(dateReverseFrame, [0, 89], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const dateExitBlur = interpolate(dateReverseFrame, [0, 70], [6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  // Date combined
  const dateFinalSlideX = frame >= dateExitStart ? dateExitSlideX : dateSlideX;
  const dateFinalOpacity = Math.min(dateOpacity, dateExitOpacity);
  const dateFinalBlur = frame >= dateExitStart ? dateExitBlur : dateBlur;

  return (
    <AbsoluteFill>
      {/* Location */}
      {location && (
        <div
          style={{
            position: "absolute",
            top: "360px",
            right: "80px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            width: "fit-content",
            height: "60px",
            transform: `translateX(${locFinalSlideX}px)`,
            paddingLeft: "20px",
          }}
        >
          {/* Line + triangle (one piece) */}
          <div
            style={{
              position: "absolute",
              bottom: -8,
              left: 0,
              right: 0,
              clipPath: `inset(-20px 0 -20px ${locFinalClipLeft}%)`,
            }}
          >
            <div
              style={{
                height: "4px",
                backgroundColor: "#FFFFFF",
              }}
            />
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
          <div
            style={{
              fontFamily,
              fontSize: "55px",
              color: "#FFFFFF",
              transform: `translateX(${locFinalTextSlideX}px)`,
              opacity: locFinalTextOpacity,
            }}
          >
            {location}
          </div>
          <Img
            src={`${staticFile("arabi21light/icons/location.png")}`}
            style={{
              paddingBottom: "20px",
              transform: `scale(${locFinalIconScale}) rotate(${locFinalIconRotation}deg)`,
              transformOrigin: "center bottom",
            }}
          />
        </div>
      )}

      {/* Source */}
      {source && (
        <div
          style={{
            position: "absolute",
            top: "445px",
            right: "80px",
            display: "flex",
            alignItems: "center",
            width: "fit-content",
            height: "37px",
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: "20px",
              color: "#FFFFFF",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: "0 10px",
              height: "100%",
              display: "flex",
              alignItems: "center",
              transform: `scaleX(${srcFinalContainerScaleX})`,
              transformOrigin: "right center",
              opacity: srcFinalContainerScaleX > 0.01 ? 1 : 0,
            }}
          >
            <span
              style={{
                opacity: srcFinalTextOpacity,
                transform: `translateX(${srcFinalTextSlideX}px)`,
                whiteSpace: "nowrap",
              }}
            >
              {source}
            </span>
          </div>
          <div
            style={{
              height: "100%",
              width: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#EA78D9",
              transform: `scaleY(${srcFinalBoxScaleY})`,
              transformOrigin: "bottom center",
              opacity: srcFinalBoxScaleY > 0.01 ? 1 : 0,
            }}
          >
            <Img
              src={`${staticFile("arabi21light/icons/source.png")}`}
              style={{
                transform: `scale(${srcFinalIconScale}) rotate(${srcFinalIconRotation}deg)`,
              }}
            />
          </div>
        </div>
      )}

      {/* Date */}
      {date && (
        <div
          style={{
            position: "absolute",
            top: "504px",
            right: "80px",
            fontFamily: fontFamilyRegular,
            fontSize: "30px",
            color: "#FFFFFF",
            transform: `translateX(${dateFinalSlideX}px)`,
            opacity: dateFinalOpacity,
            filter: `blur(${dateFinalBlur}px)`,
          }}
        >
          {date}
        </div>
      )}
    </AbsoluteFill>
  );
}
