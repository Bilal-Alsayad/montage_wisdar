import {
  Audio,
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

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
   * Alt-sol zincir parçası.
   */
  const bottomCurrentX = interpolate(sourceFrame, [1, 25], [0.378, -5.88], {
    ...CLAMP,
    easing: iconEasing,
  });

  const bottomCurrentY = interpolate(sourceFrame, [1, 25], [-2.464, 3.331], {
    ...CLAMP,
    easing: iconEasing,
  });

  /*
   * Üst-sağ zincir parçası.
   */
  const topCurrentX = interpolate(sourceFrame, [1, 25], [1.078, 9.078], {
    ...CLAMP,
    easing: iconEasing,
  });

  const topCurrentY = interpolate(sourceFrame, [1, 25], [-3.502, -11.252], {
    ...CLAMP,
    easing: iconEasing,
  });

  const bottomTranslateX = (bottomCurrentX - -5.88) * (500 / 40);

  const bottomTranslateY = (bottomCurrentY - 3.331) * (500 / 40);

  const topTranslateX = (topCurrentX - 9.078) * (500 / 40);

  const topTranslateY = (topCurrentY - -11.252) * (500 / 40);

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
        <Audio src={staticFile("harmony/sounds/ping.mov")} />
      </Sequence>
      <svg
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: 40,
          height: 40,
          flexShrink: 0,
          overflow: "visible",

          transform: "rotate(90deg)",
          transformOrigin: "center",

          opacity: sourceFrame >= 10 && isActive ? 1 : 0,
        }}
      >
        {/* Alt-sol zincir parçası */}
        <path
          d="
            M 270 355
            L 230 395
            C 180 445, 100 445, 55 400
            C 10 355, 10 275, 55 230
            L 95 190
          "
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="32"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform={`
            translate(
              ${bottomTranslateX}
              ${bottomTranslateY}
            )
          `}
        />

        <path
          d="M 145.1 328.5 L 339.9 172.2"
          pathLength={100}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="32"
          strokeLinecap="round"
          strokeDasharray={`${lineLength} 200`}
          strokeDashoffset={-lineStart}
        />
        <path
          d="
            M 230 145
            L 270 105
            C 320 55, 400 55, 445 100
            C 490 145, 490 225, 445 270
            L 405 310
          "
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="32"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform={`
            translate(
              ${topTranslateX}
              ${topTranslateY}
            )
          `}
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
