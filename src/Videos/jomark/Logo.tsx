import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export function Logo() {
  const frame = useCurrentFrame();

  const clamp = {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  } as const;

  return (
    <>
      <Img
        src={staticFile("jomark/images/logo.png")}
        style={{
          position: "absolute",
          top: -30,
          left: -38,
          width: 1080,
          height: 1920,
          opacity:
            frame < 28
              ? 0
              : interpolate(frame, [28, 48], [0.08, 1], {
                  ...clamp,
                  easing: Easing.bezier(0.333, 0, 0.667, 1),
                }),
        }}
      />

      <Img
        src={staticFile("jomark/images/tags.png")}
        style={{
          position: "absolute",
          top: 752,
          left: 0,
          width: 1080,
          height: 1080,
          opacity:
            frame < 20
              ? 0
              : interpolate(frame, [20, 40], [0.08, 1], {
                  ...clamp,
                  easing: Easing.bezier(0.333, 0, 0.667, 1),
                }),
        }}
      />
    </>
  );
}
