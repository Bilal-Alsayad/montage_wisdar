import {
  AbsoluteFill,
  Easing,
  interpolate,
  OffthreadVideo,
  staticFile,
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

const reveal = (
  frame: number,
  enterStart: number,
  enterEnd: number,
  exitStart: number,
  exitEnd: number,
) =>
  frame < exitStart
    ? interpolate(
        frame,
        [enterStart, enterEnd],
        [0, 100],
        CLAMP,
      )
    : interpolate(
        frame,
        [exitStart, exitEnd],
        [100, 0],
        {
          ...CLAMP,
          easing: Easing.bezier(0.8, 0, 0.4, 1),
        },
      );

export default function SpeakerAnimation({
  fontFamily,
  name,
  description,
}: SpeakerAnimationProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sourceFrame = frame * (25 / fps);

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

      <OffthreadVideo
        src={staticFile("fokus/elements/animation.webm")}
        transparent
        muted
        style={{
          position: "absolute",
          left: 3,
          top: 937,
          width: 987,
          height: 358,
          zIndex: 2,
        }}
      />
    </AbsoluteFill>
  );
}