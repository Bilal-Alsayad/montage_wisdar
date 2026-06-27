import {
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

export function LogoAnimation() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const slideOutStart = durationInFrames - 31;
  const slideOutEnd = durationInFrames - 1;
  const fadeOutStart = durationInFrames - 21;
  const fadeOutEnd = durationInFrames - 11;

  const shadowOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const logoOpacity = interpolate(
    frame,
    [3, 13, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const logoTop = (() => {
    if (frame <= 33) {
      return interpolate(frame, [3, 33], [539, 484], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.054, 0.013, 0, 1),
      });
    }
    return interpolate(
      frame,
      [slideOutStart, slideOutEnd],
      [484, 539],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(1, 0, 0.946, 0.987),
      },
    );
  })();

  return (
    <>
      {/* Shadow */}
      <Img
        src={staticFile("tracking/elements/shadow.png")}
        style={{
          position: "absolute",
          left: 0,
          top: 840,
          opacity: shadowOpacity,
        }}
      />

      {/* Logo */}
      <Img
        src={staticFile("tracking/elements/logo.png")}
        style={{
          position: "absolute",
          left: 60,
          top: logoTop,
          transform: "scale(0.25)",
          transformOrigin: "0 0",
          opacity: logoOpacity,
        }}
      />
    </>
  );
}
