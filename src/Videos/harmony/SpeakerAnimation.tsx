import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

interface SpeakerAnimationProps {
  name: string;
  description: string;
  nameFontFamily: string;
  descriptionFontFamily: string;
}

export const SPEAKER_ANIMATION_DURATION = 250;

const FADE_IN_DURATION = 15;
const FADE_OUT_DURATION = 15;

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export default function SpeakerAnimation({
  name,
  description,
  nameFontFamily,
  descriptionFontFamily,
}: SpeakerAnimationProps) {
  const frame = useCurrentFrame();

  const fadeInOpacity = interpolate(
    frame,
    [0, FADE_IN_DURATION],
    [0, 1],
    {
      ...CLAMP,
      easing: Easing.out(Easing.cubic),
    },
  );

  const fadeOutOpacity = interpolate(
    frame,
    [
      SPEAKER_ANIMATION_DURATION - FADE_OUT_DURATION,
      SPEAKER_ANIMATION_DURATION,
    ],
    [1, 0],
    {
      ...CLAMP,
      easing: Easing.in(Easing.cubic),
    },
  );

  const opacity = Math.min(fadeInOpacity, fadeOutOpacity);

  return (
    <AbsoluteFill
      style={{
        opacity,
        pointerEvents: "none",
      }}
    >
      <Img
        src={staticFile("harmony/images/speaker.png")}
        style={{
          position: "absolute",
          left: 162,
          top: 924,
          width: 57,
          height: 57,
          objectFit: "contain",
          filter: [
            "brightness(0)",
            "invert(1)",
            "drop-shadow(3.54px 3.54px 12.5px rgba(0, 0, 0, 0.5))",
            "drop-shadow(0 0 9.5px rgba(0, 0, 0, 0.84))",
          ].join(" "),
        }}
      />

      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "visible",
        }}
      >
        <text
          x={190}
          y={1010}
          fill="#FF002D"
          fontFamily={nameFontFamily}
          fontSize={43}
          textAnchor="start"
          style={{
            letterSpacing: 0,
          }}
        >
          {name}
        </text>

        <text
          x={185}
          y={1060}
          fill="#FFFFFF"
          fontFamily={descriptionFontFamily}
          fontSize={38}
          textAnchor="start"
          style={{
            letterSpacing: 0,
            filter: "drop-shadow(0 0 9.5px rgba(0, 0, 0, 0.84))",
          }}
        >
          {description}
        </text>
      </svg>
    </AbsoluteFill>
  );
}