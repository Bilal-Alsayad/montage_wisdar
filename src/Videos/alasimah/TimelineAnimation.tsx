import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export default function TimelineAnimation() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: 1080,
          height: 59,
          background: `linear-gradient(
            to right,
            #F0A90D 0 ${interpolate(
              frame,
              [0, durationInFrames - 1],
              [0, 100],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            )}%,
            white 0
          )`,
          maskImage: `url(${staticFile(
            "alasimah/images/timeline.png",
          )})`,
          maskSize: "100% 100%",
          maskRepeat: "no-repeat",
        }}
      />
    </AbsoluteFill>
  );
}