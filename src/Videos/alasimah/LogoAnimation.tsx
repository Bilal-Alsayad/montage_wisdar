import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export default function LogoAnimation() {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Img
        src={staticFile("alasimah/images/logo.png")}
        style={{
          position: "absolute",
          top: interpolate(frame, [0, 30], [174, 54], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.04, 0.027, 0.001, 1),
          }),
          left: 822,
          width: 300,
          opacity: interpolate(frame, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <Img
        src={staticFile("alasimah/images/play_icon.png")}
        style={{
          position: "absolute",
          top: 91.5,
          left: -4.4,
          width: 100,
          opacity: interpolate(frame, [15, 45], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
}