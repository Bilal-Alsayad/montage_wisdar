import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export default function LogoAnimation() {
  const frame = useCurrentFrame();

  const opacity =
    frame < 279
      ? interpolate(frame, [3, 13], [0, 1], CLAMP)
      : interpolate(frame, [279, 289], [1, 0], CLAMP);

  const positionY =
    frame < 269
      ? interpolate(
          frame,
          [3, 33],
          [590, 532],
          {
            ...CLAMP,
            easing: Easing.bezier(
              0.054,
              0.013,
              0,
              1,
            ),
          },
        )
      : interpolate(
          frame,
          [269, 299],
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
        transform: `scale(0.94)`,
      }}
    >
      <Img
        src={staticFile("irsal/images/logo.png")}
        style={{
          position: "absolute",
          left: -1350, //idk :P
          top: 1060,
          maxWidth: "none",
        }}
      />
    </div>
  );
}