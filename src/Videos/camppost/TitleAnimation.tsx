import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
} from "remotion";

interface TitleAnimationProps {
  text: string;
  fontFamily: string;
}

export const TITLE_ANIMATION_DURATION = 270;

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export default function TitleAnimation({
  text,
  fontFamily,
}: TitleAnimationProps) {
  const frame = useCurrentFrame();
  const words = text.trim().split(/\s+/);

  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={staticFile("camppost/elements/text_box.webm")}
        transparent
        style={{
          width: 1200,
          position: "absolute",
          left: "50%",
          bottom: 100,
          transform: "translateX(-50%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: 240,

          width: 655,
          height: 200,
          textAlign: "center",

          fontFamily,
          fontSize: 50,
          color: "#ffffff",

          // backgroundColor: "rgba(255, 0, 0, 0.3)",
        }}
      >
        {words.map((word, index) => {
          const wordStart = index * 5;

          const opacity = interpolate(
            frame,
            [wordStart, wordStart + 6],
            [0, 1],
            CLAMP,
          );

          return (
            <span
              key={`${word}-${index}`}
              style={{
                opacity,
              }}
            >
              {word}
              {index < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}