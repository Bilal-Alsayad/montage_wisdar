import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export default function LogoAnimation() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeOutStart = durationInFrames - 294;

  const opacity =
    frame < fadeOutStart + 10
      ? interpolate(frame, [3, 13], [0, 1], CLAMP)
      : interpolate(
          frame,
          [fadeOutStart + 10, fadeOutStart + 20],
          [1, 0],
          CLAMP,
        );

  const positionY =
    frame < fadeOutStart
      ? interpolate(frame, [3, 33], [590, 532], {
          ...CLAMP,
          easing: Easing.bezier(
            0.054,
            0.013,
            0,
            1,
          ),
        })
      : interpolate(
          frame,
          [fadeOutStart, fadeOutStart + 30],
          [532, 590],
          {
            ...CLAMP,
            easing: Easing.bezier(
              1,
              0,
              0.946,
              0.987,
            ),
          },
        );

  return (
    <div
      style={{
        position: "absolute",
        left: 250,
        top: positionY,
        opacity,
        transform: "scale(0.94)",
      }}
    >
      <Img
        src={staticFile("irsal/images/logo.png")}
        style={{
          position: "absolute",
          left: -1350,
          top: 1060,
          maxWidth: "none",
        }}
      />
    </div>
  );
}