import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";

interface SpeakerAnimationProps {
  name: string;
  description: string;
  fontFamily: string;
}
// animasyon tags ile ayni tek fark beyaz kare

export const SPEAKER_ANIMATION_DURATION = 125;

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

export default function SpeakerAnimation({
  name,
  description,
  fontFamily,
}: SpeakerAnimationProps) {
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

  const blackTextOpacity = interpolate(frame, [24, 41], [1, 0], {
    ...clamp,
    easing: Easing.bezier(0.167, 0.167, 0.833, 0.833),
  });

  const whiteBoxOpacity =
    frame < 26
      ? 1
      : interpolate(frame, [26, 46], [1, 0], clamp);

  const wipeFrame = frame >= 80 ? frame - 80 : frame;

  const wipeX = interpolate(wipeFrame, [0, 22], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.179, 0.528, 0.314, 0.994),
  });

  const wipeWidth = interpolate(wipeFrame, [9, 26], [41, 1], {
    ...clamp,
    easing: Easing.bezier(0.167, 0.153, 0.833, 1),
  });

  const descriptionY = interpolate(frame, [14, 39], [-95, 0], {
    ...clamp,
    easing: Easing.bezier(0.185, 0.465, 0.48, 0.998),
  });

  const descriptionOpacity = interpolate(frame, [67, 82], [1, 0], clamp);

  return (
    <AbsoluteFill>
      {name && (
        <div
          style={{
            position: "absolute",
            top: 915,
            left: 95,
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
              clipPath: `inset(0 ${(1 - blueReveal) * 100}% 0 ${
                exitErase * 100
              }%)`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: 60,
                padding: "0 20px",
                background:
                  "linear-gradient(90deg, #2337d3 0%, #233095 100%)",
                color: "#ffffff",
                fontFamily,
                fontSize: 55,
                lineHeight: 1,
                letterSpacing: -1,
                whiteSpace: "nowrap",
                transform: `translateX(${textX}px)`,
              }}
            >
              {name}
            </div>

            <div
              style={{
                width: 52,
                height: 60,
                flexShrink: 0,
                backgroundColor: "#ffffff",
                opacity: whiteBoxOpacity,
              }}
            />
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
                height: 60,
                padding: "0 20px",
                color: "#000000",
                fontFamily,
                fontSize: 55,
                lineHeight: 1,
                letterSpacing: -1,
                whiteSpace: "nowrap",
                opacity: blackTextOpacity,
                transform: `translateX(${textX}px)`,
              }}
            >
              {name}
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

      {description && (
        <div
          style={{
            position: "absolute",
            top: 977,
            left: 115,
            height: 42,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              color: "#ffffff",
              fontFamily,
              fontSize: 35,
              lineHeight: "42px",
              whiteSpace: "nowrap",
              opacity: descriptionOpacity,
              transform: `translateY(${descriptionY}px)`,
            }}
          >
            {description}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
}