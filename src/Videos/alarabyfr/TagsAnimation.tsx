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

export const TAGS_ANIMATION_DURATION = 140;

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

export default function TagsAnimation({
  location,
  date,
  fontFamily,
}: TagsAnimationProps) {
  const frame = useCurrentFrame() * (25 / 30);

  const whiteReveal = interpolate(frame, [0, 22], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.127, 0.117, 0.121, 1),
  });

  const blueReveal =
    frame < 6
      ? 0
      : interpolate(frame, [6, 28], [0, 1], {
          ...clamp,
          easing: Easing.bezier(0.127, 0.117, 0.121, 1),
        });

  const whiteErase =
    frame < 13
      ? 0
      : interpolate(frame, [13, 35], [0, 1], {
          ...clamp,
          easing: Easing.bezier(0.127, 0.117, 0.121, 1),
        });

  const exitErase =
    frame < 80
      ? 0
      : interpolate(frame, [80, 102], [0, 1], {
          ...clamp,
          easing: Easing.bezier(0.179, 0.528, 0.314, 0.994),
        });

  const textX = interpolate(frame, [1, 25], [-67, 0], {
    ...clamp,
    easing: Easing.bezier(0.127, 0.391, 0.434, 1),
  });

  const iconX = interpolate(frame, [26, 46], [-50, 0], {
    ...clamp,
    easing: Easing.bezier(0.013, 0.201, 0.307, 1),
  });

  const blackTextOpacity = interpolate(frame, [24, 41], [1, 0], {
    ...clamp,
    easing: Easing.bezier(0.167, 0.167, 0.833, 0.833),
  });

  const wipeFrame = frame >= 80 ? frame - 80 : frame;

  const wipeX = interpolate(wipeFrame, [0, 22], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.179, 0.528, 0.314, 0.994),
  });

  const wipeWidth = interpolate(wipeFrame, [9, 26], [41, 1], {
    ...clamp,
    easing: Easing.bezier(0.167, 0.153, 0.833, 1),
  });

  return (
    <AbsoluteFill>
      {location && (
        <div
          style={{
            position: "absolute",
            top: 215,
            left: 110,
            width: "max-content",
            height: 60,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "max-content",
              height: 60,
              background:
                "linear-gradient(90deg, #2337d3 0%, #233095 100%)",
              clipPath: `inset(0 ${(1 - blueReveal) * 100}% 0 ${
                exitErase * 100
              }%)`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 20px",
                color: "#ffffff",
                fontFamily,
                fontSize: 47,
                lineHeight: 1,
                letterSpacing: -1,
                whiteSpace: "nowrap",
                transform: `translateX(${textX}px)`,
              }}
            >
              {location}
            </div>

            <div
              style={{
                width: 52,
                height: 60,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
                overflow: "hidden",
              }}
            >
              {frame >= 26 && frame < 102 && (
                <Img
                  src={staticFile("alarabyfr/images/location.png")}
                  style={{
                    width: 46,
                    height: 46,
                    objectFit: "contain",
                    transform: `translateX(${iconX}px)`,
                  }}
                />
              )}
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              backgroundColor: "#ffffff",
              clipPath: `inset(0 ${(1 - whiteReveal) * 100}% 0 ${
                whiteErase * 100
              }%)`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 20px",
                color: "#000000",
                fontFamily,
                fontSize: 47,
                lineHeight: 1,
                letterSpacing: -1,
                whiteSpace: "nowrap",
                opacity: blackTextOpacity,
                transform: `translateX(${textX}px)`,
              }}
            >
              {location}
            </div>

            <div
              style={{
                width: 52,
                flexShrink: 0,
              }}
            />
          </div>

          {(frame < 26 || (frame >= 80 && frame < 106)) && (
            <div
              style={{
                position: "absolute",
                left: `calc(${wipeX * 100}% - ${wipeWidth / 2}px)`,
                width: wipeWidth,
                height: 60,
                backgroundColor: "#ffffff",
              }}
            />
          )}
        </div>
      )}

      {date && (
        <div
          style={{
            position: "absolute",
            top: 290,
            left: 110,
            width: "max-content",
            height: 60,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "max-content",
              height: 60,
              background:
                "linear-gradient(90deg, #2337d3 0%, #233095 100%)",
              clipPath: `inset(0 ${(1 - blueReveal) * 100}% 0 ${
                exitErase * 100
              }%)`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 20px",
                color: "#ffffff",
                fontFamily,
                fontSize: 47,
                lineHeight: 1,
                letterSpacing: -1,
                whiteSpace: "nowrap",
                transform: `translateX(${textX}px)`,
              }}
            >
              {date}
            </div>

            <div
              style={{
                width: 52,
                height: 60,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
                overflow: "hidden",
              }}
            >
              {frame >= 26 && frame < 102 && (
                <Img
                  src={staticFile("alarabyfr/images/date.png")}
                  style={{
                    width: 46,
                    height: 46,
                    objectFit: "contain",
                    transform: `translateX(${iconX}px)`,
                  }}
                />
              )}
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              backgroundColor: "#ffffff",
              clipPath: `inset(0 ${(1 - whiteReveal) * 100}% 0 ${
                whiteErase * 100
              }%)`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 20px",
                color: "#000000",
                fontFamily,
                fontSize: 47,
                lineHeight: 1,
                letterSpacing: -1,
                whiteSpace: "nowrap",
                opacity: blackTextOpacity,
                transform: `translateX(${textX}px)`,
              }}
            >
              {date}
            </div>

            <div
              style={{
                width: 52,
                flexShrink: 0,
              }}
            />
          </div>

          {(frame < 26 || (frame >= 80 && frame < 106)) && (
            <div
              style={{
                position: "absolute",
                left: `calc(${wipeX * 100}% - ${wipeWidth / 2}px)`,
                width: wipeWidth,
                height: 60,
                backgroundColor: "#ffffff",
              }}
            />
          )}
        </div>
      )}
    </AbsoluteFill>
  );
}