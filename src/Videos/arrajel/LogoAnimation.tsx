import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { f } from "../../utils/constants";

// All frame numbers below are written for 30fps. f() converts them to the video fps.
const EASE = Easing.bezier(0.12, 0, 0.12, 1);
const EASE_EXIT = Easing.bezier(0.88, 0, 0.88, 1);

const CLAMP = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

// Center of the logo on the 1080x1920 canvas
const CENTER_X = 833.151;
const CENTER_Y = 371;

const SVG_SIZE = 220;
const MID = SVG_SIZE / 2;

export default function LogoAnimation() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Everything fades out just before the end of the sequence
  const exitStart = durationInFrames - f(15);
  const exitEnd = durationInFrames - f(3);
  const fadeOut = interpolate(frame, [exitStart, exitEnd], [1, 0], CLAMP);
  const fadeOutEased = interpolate(frame, [exitStart, exitEnd], [1, 0], {
    ...CLAMP,
    easing: EASE_EXIT,
  });

  // Red ring draws itself (0 -> 100%)
  const ringDraw = interpolate(frame, [0, f(16.5)], [0, 100], {
    ...CLAMP,
    easing: EASE,
  });

  // Logo scales up, overshoots a little, then settles (0.30 = 150px)
  const logoScale = interpolate(
    frame,
    [f(4.5), f(12.6), f(16.5)],
    [0, 0.3253, 0.3012],
    { ...CLAMP, easing: EASE },
  );

  // Green dashed ring fades in and keeps spinning (18 degrees per second)
  const dashedFadeIn = interpolate(frame, [f(12), f(24)], [0, 0.9], CLAMP);
  const dashedRotation = (frame / fps) * 18;

  return (
    <AbsoluteFill>
      <svg
        width={SVG_SIZE}
        height={SVG_SIZE}
        style={{
          position: "absolute",
          left: CENTER_X - MID,
          top: CENTER_Y - MID,
          overflow: "visible",
        }}
      >
        {/* Red ring (starts at the top, draws clockwise) */}
        {ringDraw > 0 && (
          <circle
            cx={MID}
            cy={MID}
            r={83}
            fill="none"
            stroke="#9F1117"
            strokeWidth={5}
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray={`${ringDraw} 100`}
            transform={`rotate(-90 ${MID} ${MID})`}
            opacity={fadeOut}
          />
        )}

        {/* Green dashed ring */}
        <circle
          cx={MID}
          cy={MID}
          r={92}
          fill="none"
          stroke="#078439"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray="10 14"
          transform={`rotate(${dashedRotation} ${MID} ${MID})`}
          opacity={dashedFadeIn * fadeOut}
        />
      </svg>

      {/* Logo image is 500x500, centered on the rings */}
      <Img
        src={staticFile("arrajel/elements/logo.png")}
        style={{
          position: "absolute",
          left: CENTER_X - 250,
          top: CENTER_Y - 250,
          width: 500,
          height: 500,
          opacity: fadeOutEased,
          transform: `scale(${logoScale})`,
        }}
      />
    </AbsoluteFill>
  );
}
