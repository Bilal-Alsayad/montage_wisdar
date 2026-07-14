import {
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";

interface SourceAnimationProps {
  source?: string;
  fontFamily: string;
}

const AUDIO_DURATION_IN_FRAMES =48;
const VISUAL_DURATION_IN_FRAMES = 204;

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export default function SourceAnimation({
  source,
  fontFamily,
}: SourceAnimationProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!source) return null;

  const visualFrame = frame - 8;
  const animationDuration = Math.max(
    1,
    Math.min(fps, VISUAL_DURATION_IN_FRAMES / 2),
  );

  const fadeInFrame = interpolate(
    visualFrame,
    [0, animationDuration],
    [0, 25],
    CLAMP,
  );

  const fadeOutFrame = interpolate(
    visualFrame,
    [VISUAL_DURATION_IN_FRAMES - animationDuration, VISUAL_DURATION_IN_FRAMES],
    [25, 0],
    CLAMP,
  );

  const sourceFrame = Math.min(fadeInFrame, fadeOutFrame);
  const isActive = frame >= 8 && frame <= 212;

  const textProgress = interpolate(sourceFrame, [2, 25], [0, 1], {
    ...CLAMP,
    easing: Easing.bezier(0.747, 0, 0.149, 1),
  });

  const textX = interpolate(textProgress, [0, 1], [-36, 0], CLAMP);

  const textOpacity = interpolate(textProgress, [0, 1], [0, 1], CLAMP);

  const iconEasing = Easing.bezier(0.649, 0, 0.318, 1);

  /*
   * Diagonal separation along the chain's 45° axis:
   * upper-left piece slides in from top-left,
   * lower-right piece slides in from bottom-right.
   */
  const separationXY = interpolate(sourceFrame, [1, 25], [-2, 0], {
    ...CLAMP,
    easing: iconEasing,
  });

  const bottomTranslateX = -separationXY;
  const bottomTranslateY = -separationXY;
  const topTranslateX = separationXY;
  const topTranslateY = separationXY;

  const lineStart = interpolate(sourceFrame, [1, 25], [50, 0], {
    ...CLAMP,
    easing: Easing.bezier(0.71, 0.057, 0.157, 0.933),
  });

  const lineEnd = interpolate(sourceFrame, [1, 25], [50, 100], {
    ...CLAMP,
    easing: Easing.bezier(0.71, -0.057, 0.157, 1.067),
  });

  const lineLength = Math.max(0, lineEnd - lineStart);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexShrink: 0,
        whiteSpace: "nowrap",
        opacity: isActive ? 1 : 0,
        pointerEvents: "none",
      }}
    >
      <Sequence
        from={6}
        durationInFrames={AUDIO_DURATION_IN_FRAMES}
        layout="none"
      >
        <Audio src={staticFile("harmony/sounds/ping.wav")} />
      </Sequence>
      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: 40,
          height: 40,
          flexShrink: 0,
          overflow: "visible",

          transformOrigin: "center",

          opacity: sourceFrame >= 10 && isActive ? 1 : 0,
        }}
      >
        {/* Alt-sol zincir parçası */}
        <path
          d="M6.1,11.8C5.3,11,4.9,10,4.9,8.9s0.4-2.1,1.2-2.8c1.5-1.5,4.1-1.5,5.7,0l4.9,4.9c0.4,0.4,1,0.4,1.4,0s0.4-1,0-1.4l-4.9-4.9C12,3.6,10.5,2.9,8.9,2.9S5.8,3.6,4.7,4.7C3.6,5.8,2.9,7.3,2.9,8.9s0.6,3.1,1.8,4.2l4.9,4.9c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L6.1,11.8z"
          fill="#FFFFFF"
          transform={`translate(${bottomTranslateX} ${bottomTranslateY})`}
        />

        {/* Orta çizgi */}
        <path
          d="M11.1,11.1l8.5,8.5"
          pathLength={100}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${lineLength} 200`}
          strokeDashoffset={-lineStart}
        />

        {/* Üst-sağ zincir parçası */}
        <path
          d="M27.3,18.8l-4.9-4.9c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l4.9,4.9c0.8,0.8,1.2,1.8,1.2,2.8s-0.4,2.1-1.2,2.8c-1.5,1.5-4.1,1.5-5.7,0L15.3,21c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l4.9,4.9c1.1,1.1,2.6,1.8,4.2,1.8s3.1-0.6,4.2-1.8c1.1-1.1,1.8-2.6,1.8-4.2S28.4,20,27.3,18.8z"
          fill="#FFFFFF"
          transform={`translate(${topTranslateX} ${topTranslateY})`}
        />
      </svg>

      <div
        style={{
          color: "#FFFFFF",
          fontFamily,
          fontSize: 36,
          fontWeight: 600,
          lineHeight: "43.2px",
          letterSpacing: 0,
          whiteSpace: "nowrap",
          opacity: textOpacity,
          transform: `translateY(${textX}px)`,
        }}
      >
        {source}
      </div>
    </div>
  );
}
