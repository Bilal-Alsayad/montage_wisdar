import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

// Enter
export const SPEAKER_ANIMATION_DURATION = 180;

const EASE_ENTER = Easing.bezier(0.161, 0, 0.108, 1);
// Exit
const EASE_EXIT = Easing.bezier(0.865, 0, 0.833, 1);

const SLIDE_DISTANCE = 456;

interface SpeakerAnimationProps {
  name: string;
  description: string;
  fontFamilyMedium: string;
  fontFamilyRegular: string;
}

export default function SpeakerAnimation({
  name,
  description,
  fontFamilyMedium,
  fontFamilyRegular,
}: SpeakerAnimationProps) {
  const frame = useCurrentFrame();

  // Enter: slide from right
  const enterX = interpolate(frame, [0, 45], [SLIDE_DISTANCE, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_ENTER,
  });

  // Exit: slide to right
  const exitX = interpolate(frame, [149, 179], [0, SLIDE_DISTANCE], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_EXIT,
  });

  const translateX = enterX + exitX;

  return (
    <AbsoluteFill>
      <div
        style={{
          height: 150,
          width: "fit-content",
          backgroundColor: "#FFFFFF",
          borderTop: "23px solid #F6F6F6",
          padding: "5px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          position: "absolute",
          right: 120,
          top: 1200,
          transform: `translateX(${translateX}px)`,
        }}
      >
        <div
          style={{
            fontSize: 46,
            color: "#11EDF9",
            fontFamily: fontFamilyMedium,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 33,
            color: "#000000",
            fontFamily: fontFamilyRegular,
            transform: `translateY(-3px)`,
          }}
        >
          {description}
        </div>
      </div>
    </AbsoluteFill>
  );
}
