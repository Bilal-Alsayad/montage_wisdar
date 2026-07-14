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

  const top = interpolate(
    frame,
    [0, 25],
    [-160, 0],
    {
      ...CLAMP,
      easing: Easing.out(Easing.cubic),
    },
  );

  return (
    <Img
      src={staticFile("tvent/images/logo.png")}
      style={{
        position: "absolute",
        left: 80,
        top,
        width:160,
      }}
    />
  );
}