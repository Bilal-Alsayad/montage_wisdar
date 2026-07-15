import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

const TEXT_EASE = Easing.bezier(0.333, 0, 0.667, 1);

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const TAG_TEXT_REVEAL_END = 16;

export const TAGS_ANIMATION_DURATION = 144;

interface TagsAnimationProps {
  source?: string;
  location?: string;
  date?: string;
  fontFamily: string;
}

interface AnimatedCharactersProps {
  text: string;
  endFrame: number;
  reverse?: boolean;
}

const AnimatedCharacters: React.FC<AnimatedCharactersProps> = ({
  text,
  endFrame,
  reverse = false,
}) => {
  const frame = useCurrentFrame();
  const characters = [...text];

  const revealedCharacters = interpolate(
    frame,
    [0, endFrame],
    [0, characters.length],
    {
      ...CLAMP,
      easing: TEXT_EASE,
    },
  );

  return (
    <>
      {characters.map((character, index) => {
        const characterOrder = reverse
          ? characters.length - index - 1
          : index;

        const characterProgress = interpolate(
          revealedCharacters,
          [characterOrder, characterOrder + 1],
          [0, 1],
          CLAMP,
        );

        return (
          <span
            key={index}
            style={{
              display: "inline-block",
              opacity: characterProgress,
              transform: `translateX(${interpolate(
                characterProgress,
                [0, 1],
                [16, 0],
                CLAMP,
              )}px)`,
            }}
          >
            {character === " " ? "\u00A0" : character}
          </span>
        );
      })}
    </>
  );
};

const TagsAnimation: React.FC<TagsAnimationProps> = ({
  source = "",
  location = "",
  date = "",
  fontFamily,
}) => {
  const frame = useCurrentFrame();

  const boxOpacity = interpolate(
    frame,
    [0, 11],
    [0.02, 1],
    {
      ...CLAMP,
      easing: TEXT_EASE,
    },
  );

  return (
    <AbsoluteFill>
      {/* ── Location and date ── */}
      <div
        style={{
          position: "absolute",
          top: 180,
          right: 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 6,
        }}
      >
        {location && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "max-content",
              minWidth: 115,
              height: 50,
              padding: "0 18px",
              boxSizing: "border-box",
              overflow: "hidden",
              border: "3px solid #FFFFFF",
              borderRadius: 7,
              backgroundColor: "#06081E",
              color: "#EEEEF1",
              fontFamily,
              fontSize: 24,
              fontWeight: 700,
              lineHeight: 1,
              whiteSpace: "nowrap",
              opacity: boxOpacity,
            }}
          >
            <AnimatedCharacters
              text={location}
              endFrame={TAG_TEXT_REVEAL_END}
              reverse
            />
          </div>
        )}

        {date && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "max-content",
              minWidth: 150,
              height: 50,
              padding: "0 20px",
              boxSizing: "border-box",
              overflow: "hidden",
              borderRadius: 7,
              backgroundColor: "#FFFFFF",
              color: "#000000",
              fontFamily,
              fontSize: 24,
              lineHeight: 1,
              whiteSpace: "nowrap",
              opacity: boxOpacity,
            }}
          >
            <AnimatedCharacters
              text={date}
              endFrame={TAG_TEXT_REVEAL_END}
              reverse
            />
          </div>
        )}
      </div>

      {/* ── Source ── */}
      {source.trim() && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 55,
            transform: "translateY(-50%)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: 24,
              gap: 10,
              transform: "rotate(-90deg)",
              transformOrigin: "9px center",
            }}
          >
            <Img
              src={staticFile("tvent/images/source.png")}
              style={{
                width: 18,
                height: 12,
              }}
            />

            <div
              style={{
                color: "#FFFFFF",
                fontFamily,
                fontSize: 24,
                lineHeight: 1,
                whiteSpace: "nowrap",
              }}
            >
              <AnimatedCharacters
                text={source}
                endFrame={23}
              />
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

export default TagsAnimation;