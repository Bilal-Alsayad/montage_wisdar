import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface SpeakerAnimationProps {
  fontFamily: string;
  name: string;
  description: string;
}

export const SPEAKER_ANIMATION_DURATION = 212;

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const RED = "#b80c09";

const ease = Easing.bezier(0.167, 0.167, 0.4, 1);

const cubic = (
  start: number,
  control1: number,
  control2: number,
  end: number,
  progress: number,
) => {
  const remaining = 1 - progress;

  return (
    remaining ** 3 * start +
    3 * remaining ** 2 * progress * control1 +
    3 * remaining * progress ** 2 * control2 +
    progress ** 3 * end
  );
};

const reveal = (
  frame: number,
  enterStart: number,
  enterEnd: number,
  exitStart: number,
  exitEnd: number,
) =>
  frame < exitStart
    ? interpolate(frame, [enterStart, enterEnd], [0, 100], CLAMP)
    : interpolate(frame, [exitStart, exitEnd], [100, 0], {
        ...CLAMP,
        easing: Easing.bezier(0.8, 0, 0.4, 1),
      });

export default function SpeakerAnimation({
  fontFamily,
  name,
  description,
}: SpeakerAnimationProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sourceFrame = frame * (25 / fps);

  const circleScale = interpolate(
    sourceFrame,
    [0, 6],
    [0, 1],
    {
      ...CLAMP,
      easing: Easing.bezier(0.167, 0.167, 0.4, 1),
    },
  );

  const circleMove = interpolate(
    sourceFrame,
    [156, 163],
    [0, 1],
    {
      ...CLAMP,
      easing: Easing.bezier(0.6, 0, 0.833, 0.833),
    },
  );

  const circleY = cubic(
    230.732,
    217.649,
    165.315,
    152.232,
    circleMove,
  );

  const squareScaleY = interpolate(
    sourceFrame,
    [6, 13],
    [0, 1],
    {
      ...CLAMP,
      easing: Easing.bezier(0.167, 0, 0.4, 1),
    },
  );

  const rectangleScaleY = interpolate(
    sourceFrame,
    [9, 20.400390625],
    [0, 1],
    {
      ...CLAMP,
      easing: Easing.bezier(0.167, 0, 0.4, 1),
    },
  );

  const rectangleMove = interpolate(
    sourceFrame,
    [16.6, 28],
    [0, 1],
    {
      ...CLAMP,
      easing: ease,
    },
  );

  const rectangleY = cubic(
    121.665,
    157.332,
    299.998,
    335.665,
    rectangleMove,
  );

  const rectangleOpacity = interpolate(
    sourceFrame,
    [17, 28],
    [1, 0],
    {
      ...CLAMP,
      easing: Easing.bezier(0.167, 0.167, 0.833, 0.833),
    },
  );

  const exitSquareProgress = interpolate(
    sourceFrame,
    [163, 172],
    [0, 1],
    {
      ...CLAMP,
      easing: ease,
    },
  );

  return (
    <AbsoluteFill>
      {name && (
        <div
          style={{
            position: "absolute",
            left: 147,
            top: 1058,
            height: 61,
            clipPath: `inset(0 ${
              100 - reveal(sourceFrame, 8, 49, 139, 165)
            }% 0 0)`,
          }}
        >
          <div
            dir="auto"
            style={{
              display: "flex",
              alignItems: "center",
              height: 61,
              paddingRight: 20,
              paddingLeft: 40,
              backgroundColor: "white",
              color: "black",
              fontFamily,
              fontSize: 48,
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            {Array.from(name).map((character, index) => {
              const characterIndex = name
                .slice(0, index)
                .replace(/\s/g, "").length;

              return (
                <span
                  key={index}
                  style={{
                    opacity: character.trim()
                      ? interpolate(
                          sourceFrame,
                          [
                            30 + characterIndex * 1.5,
                            33 + characterIndex * 1.5,
                          ],
                          [0, 1],
                          CLAMP,
                        )
                      : 1,
                  }}
                >
                  {character === " " ? "\u00A0" : character}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {description && (
        <div
          style={{
            position: "absolute",
            left: 147,
            top: 1137,
            height: 61,
            clipPath: `inset(0 ${
              100 - reveal(sourceFrame, 11, 52, 135, 161)
            }% 0 0)`,
          }}
        >
          <div
            dir="auto"
            style={{
              display: "flex",
              alignItems: "center",
              height: 61,
              paddingRight: 20,
              paddingLeft: 40,
              backgroundColor: "white",
              color: "black",
              fontFamily,
              fontSize: 36,
              whiteSpace: "nowrap",
            }}
          >
            {Array.from(description).map((character, index) => {
              const characterIndex = description
                .slice(0, index)
                .replace(/\s/g, "").length;

              return (
                <span
                  key={index}
                  style={{
                    opacity: character.trim()
                      ? interpolate(
                          sourceFrame,
                          [
                            33 + characterIndex * 1.5,
                            36 + characterIndex * 1.5,
                          ],
                          [0, 1],
                          CLAMP,
                        )
                      : 1,
                  }}
                >
                  {character === " " ? "\u00A0" : character}
                </span>
              );
            })}
          </div>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          left: 3,
          top: 937,
          width: 987,
          height: 358,
          zIndex: 2,
        }}
      >
        {sourceFrame >= 9 && sourceFrame < 28 && (
          <div
            style={{
              position: "absolute",
              left: 43.907,
              top: 121.665,
              width: 53,
              height: 213,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: rectangleY - 121.665,
                width: 53,
                height: 213,
                backgroundColor: RED,
                opacity: rectangleOpacity,
                transform: `scaleY(${rectangleScaleY})`,
                transformOrigin: "26.5px 0",
              }}
            />
          </div>
        )}

        {sourceFrame >= 6 && sourceFrame < 163 && (
          <div
            style={{
              position: "absolute",
              left: 114.639,
              top: 121.664,
              width: 61,
              height: 61,
              backgroundColor: RED,
              transform: `scaleY(${squareScaleY})`,
              transformOrigin: "30.5px 61px",
            }}
          />
        )}

        {sourceFrame >= 163 && sourceFrame < 176 && (
          <div
            style={{
              position: "absolute",
              left: 114.375,
              top: 121.665,
              width: 61,
              height: 61,
              backgroundColor: RED,
              transform: `
                rotate(${-90 * exitSquareProgress}deg)
                scale(${1 - exitSquareProgress})
              `,
              transformOrigin: "30.5px 30.5px",
            }}
          />
        )}

        {sourceFrame >= 0 && sourceFrame < 163 && (
          <div
            style={{
              position: "absolute",
              left: 114.639,
              top: circleY - 30.175,
              width: 61,
              height: 61,
              borderRadius: "50%",
              backgroundColor: RED,
              transform: `scale(${circleScale})`,
              transformOrigin: "30.175px 30.175px",
            }}
          />
        )}
      </div>
    </AbsoluteFill>
  );
}