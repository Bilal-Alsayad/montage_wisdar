import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export const LOCATION_ANIMATION_DURATION = 150;

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const ease = Easing.bezier(0.333, 0, 0.667, 1);

export default function LocationAnimation({
  text,
  fontFamily,
}: {
  text?: string;
  fontFamily: string;
}) {
  const frame = useCurrentFrame();

  if (!text) return null;

  const animationFrame = frame < 108 ? frame : 150 - frame;

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 298,
          right: 157,
          height: 55,
          padding: "0 30.75px",
          display: "flex",
          alignItems: "center",
          fontFamily,
          fontSize: 30,
          whiteSpace: "nowrap",
          transform: `translateX(${interpolate(
            animationFrame,
            [4.8, 20.4],
            [36, 0],
            {...clamp, easing: ease},
          )}px)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#ffffff",
            transform: `scaleX(${interpolate(
              animationFrame,
              [4.8, 19.2],
              [0, 1],
              {...clamp, easing: ease},
            )})`,
            transformOrigin: "right center",
          }}
        />
        <div
          style={{
            position: "relative",
            color: "#9A151E",
            clipPath: `inset(0 0 0 ${interpolate(
              animationFrame,
              [7.2, 25.2],
              [100, 0],
              {
                ...clamp,
                easing: Easing.bezier(0.194, 0, 0.333, 1),
              },
            )}%)`,
          }}
        >
          {text}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 298,
          right: 102,
          width: 55,
          height: 55,
          backgroundColor: "#9A151E",
          transform: `translateX(${interpolate(
            animationFrame,
            [0, 19.2],
            [68, 0],
            {...clamp, easing: ease},
          )}px) scaleX(${interpolate(
            animationFrame,
            [0, 12],
            [0.16, 1],
            {...clamp, easing: ease},
          )})`,
          transformOrigin: "right center",
        }}
      />

      <Img
        src={staticFile("nabiz/images/location.png")}
        style={{
          position: "absolute",
          top: 301.5,
          right: 112.85,
          width: 32.3,
          height: 45,
          opacity: interpolate(animationFrame, [0, 7.2], [0, 1], clamp),
        }}
      />
    </>
  );
}
