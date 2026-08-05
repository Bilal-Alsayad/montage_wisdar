/* eslint-disable @remotion/no-background-image */
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

interface TagsAnimationProps {
  location: string;
  date: string;
  fontFamily: string;
}

export const TAGS_ANIMATION_DURATION = 168;

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const ease = Easing.bezier(0.33, 0, 0.2, 1);

export default function TagsAnimation({
  location,
  date,
  fontFamily,
}: TagsAnimationProps) {
  const frame = useCurrentFrame();

  if (!location && !date) {
    return null;
  }

  const locationCircleScale = interpolate(frame, [0, 18], [0.02, 1], {
    ...clamp,
    easing: ease,
  });

  const locationIconLeft = interpolate(frame, [7, 24], [8, 55], {
    ...clamp,
    easing: ease,
  });

  const locationIconTop = interpolate(frame, [7, 24], [102, 55], {
    ...clamp,
    easing: ease,
  });

  const locationBoxScale = interpolate(frame, [9, 30], [0, 1], {
    ...clamp,
    easing: ease,
  });

  const locationTextX = interpolate(frame, [16, 32], [28, 0], {
    ...clamp,
    easing: ease,
  });

  const locationTextOpacity = interpolate(frame, [16, 25], [0, 1], clamp);

  const dateFrame = frame - 18;

  const dateScale = interpolate(dateFrame, [0, 24], [0, 1], {
    ...clamp,
    easing: ease,
  });

  const dateRight = interpolate(dateFrame, [0, 24], [80, 115], {
    ...clamp,
    easing: ease,
  });

  const dateTextX = interpolate(dateFrame, [8, 24], [25, 0], {
    ...clamp,
    easing: ease,
  });

  const dateTextOpacity = interpolate(dateFrame, [8, 17], [0, 1], clamp);

  return (
    <AbsoluteFill>
      {location && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: interpolate(frame, [141, 164], [1, 0], clamp),
            transform: `translateX(${interpolate(frame, [141, 164], [0, 100], {
              ...clamp,
              easing: ease,
            })}px)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 915,
              top: 370,
              width: 110,
              height: 110,
              zIndex: 4,
              transform: `scale(${locationCircleScale})`,
            }}
          >
            <Img
              src={staticFile("wajha/images/locationbox2.png")}
              style={{
                width: "100%",
                height: "100%",
              }}
            />

            <Img
              src={staticFile("wajha/images/location.png")}
              style={{
                position: "absolute",
                left: locationIconLeft,
                top: locationIconTop,
                width: 45,
                height: 45,
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>

          <div
            dir="rtl"
            style={{
              position: "absolute",
              right: 140,
              top: 430,
              zIndex: 2,
              minHeight: 72,
              padding: "0 32px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              fontFamily,
              fontSize: 50,
              color: "#000",
              whiteSpace: "nowrap",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url("${staticFile(
                  "wajha/images/locationbox.png",
                )}")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "100% 100%",
                transform: `scaleX(${locationBoxScale})`,
                transformOrigin: "right center",
              }}
            />

            <div
              style={{
                position: "relative",
                opacity: locationTextOpacity,
                transform: `translateX(${locationTextX}px)`,
              }}
            >
              {location}
            </div>
          </div>
        </div>
      )}

      {date && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: interpolate(frame, [144, 167], [1, 0], clamp),
            transform: `translateX(${interpolate(frame, [144, 167], [0, 100], {
              ...clamp,
              easing: ease,
            })}px)`,
          }}
        >
          <div
            dir="ltr"
            style={{
              position: "absolute",
              right: dateRight,
              top: 503,
              zIndex: 1,
              minHeight: 68,
              padding: "0 28px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              fontFamily,
              fontSize: 45,
              color: "#fff",
              whiteSpace: "nowrap",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url("${staticFile(
                  "wajha/images/date.png",
                )}")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "100% 100%",
                transform: `scaleX(${dateScale})`,
                transformOrigin: "right center",
              }}
            />

            <div
              style={{
                position: "relative",
                opacity: dateTextOpacity,
                transform: `translateX(${dateTextX}px)`,
              }}
            >
              {date}
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
}
