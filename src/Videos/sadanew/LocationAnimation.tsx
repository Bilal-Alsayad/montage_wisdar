import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { f } from "../../utils/constants";

const EASE_BG = Easing.bezier(0.333, 0, 0, 1);

export default function LocationAnimation({
  text,
  fontFamily,
}: {
  text: string;
  fontFamily: string;
}) {
  const frame = useCurrentFrame();

  if (!text) return null;

  // Exit
  const locationExit = interpolate(frame, [f(120), f(125)], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Location pill scaleX
  const bgProgress = interpolate(frame, [f(37), f(66)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_BG,
  });

  return (
    <AbsoluteFill>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 15,
          position: "absolute",
          top: 245,
          left: 170,
          fontFamily,
          fontSize: 30,
          color: "transparent",
          width: "fit-content",
          backgroundColor: "#11EDF9",
          padding: "2px 20px",
          borderRadius: 15,
          opacity: locationExit,
          clipPath: `inset(0 ${(1 - bgProgress) * 100}% 0 0)`,
          transformOrigin: "left center",
        }}
      >
        {/* Location pin icon */}
        <Img
          src={staticFile("sadanew/icons/location.png")}
          style={{
            zIndex: 1,
          }}
        />

        {/* Location text */}
        <div
          style={{
            fontFamily,
            fontSize: 30,
            color: "#000000",
            width: "fit-content",
            transform: `translateY(-3px)`,
          }}
        >
          {text}
        </div>
      </div>
    </AbsoluteFill>
  );
}
