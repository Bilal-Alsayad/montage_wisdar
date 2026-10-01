import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

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

export const TAGS_ANIMATION_DURATION = 144;

const AnimatedCharacters: React.FC<AnimatedCharactersProps> = ({
  text,
  endFrame,
  reverse = false,
}) => {
  const frame = useCurrentFrame();
  const characters = [...text];
  const revealed = interpolate(
    frame,
    [0, endFrame],
    [0, characters.length],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.333, 0, 0.667, 1),
    },
  );

  return (
    <>
      {characters.map((character, index) => {
        const order = reverse ? characters.length - index - 1 : index;
        const progress = interpolate(
          revealed,
          [order, order + 1],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        return (
          <span
            key={index}
            style={{
              display: "inline-block",
              opacity: progress,
              transform: `translateX(${interpolate(
                progress,
                [0, 1],
                [16, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
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

export default function TagsAnimation({
  source = "",
  location = "",
  date = "",
  fontFamily,
}: TagsAnimationProps) {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
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
              minWidth: 115,
              height: 50,
              padding: "0 18px",
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
              opacity: interpolate(frame, [0, 11], [0.02, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.333, 0, 0.667, 1),
              }),
            }}
          >
            <AnimatedCharacters text={location} endFrame={16} reverse />
          </div>
        )}

        {date && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              minWidth: 150,
              height: 50,
              padding: "0 20px",
              overflow: "hidden",
              borderRadius: 7,
              backgroundColor: "#FFFFFF",
              color: "#000000",
              fontFamily,
              fontSize: 24,
              lineHeight: 1,
              whiteSpace: "nowrap",
              opacity: interpolate(frame, [0, 11], [0.02, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.333, 0, 0.667, 1),
              }),
            }}
          >
            <AnimatedCharacters text={date} endFrame={16} reverse />
          </div>
        )}
      </div>

      {source.trim() && (
        <div
          style={{
            position: "absolute",
            top: 780,
            left: 100,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: 24,
              gap: 12,
              transform: "rotate(-90deg)",
              transformOrigin: "9px center",
            }}
          >
            <Img
              src={staticFile("nuans/images/source.png")}
              style={{
                width: 22,
                height: "auto",
              }}
            />

            <div
              style={{
                color: "#FFFFFF",
                fontFamily,
                fontSize: 28,
                lineHeight: 1,
                whiteSpace: "nowrap",
              }}
            >
              <AnimatedCharacters text={source} endFrame={23} />
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
}
